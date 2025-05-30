import './App.css';
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App(): React.ReactElement {
  // 添加状态管理
  const [inputText, setInputText] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 处理输入变化
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  // 在React组件中添加提交函数
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/saveText', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: inputText })
      });

      console.log('响应状态:', response.status);

      if (response.ok) {
        setSnackbarSeverity('success');
        setSnackbarMessage('保存成功');
        setOpenSnackbar(true);
        setInputText(''); // 清空输入框
      } else {
        const errorText = await response.text();
        console.error('响应错误:', errorText);
        setSnackbarSeverity('error');
        setSnackbarMessage(`保存失败: ${response.status} ${errorText}`);
        setOpenSnackbar(true);
      }
    } catch (error: any) {
      console.error('请求出错:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage(`请求错误: ${error.message}`);
      setOpenSnackbar(true);
    }
  };

  // 获取数据的函数
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getAllData');

      if (response.ok) {
        const data = await response.json();
        setTableData(data);
        setSnackbarSeverity('success');
        setSnackbarMessage('数据获取成功');
        setOpenSnackbar(true);
      } else {
        const errorText = await response.text();
        console.error('获取数据错误:', errorText);
        setSnackbarSeverity('error');
        setSnackbarMessage(`获取数据失败: ${response.status} ${errorText}`);
        setOpenSnackbar(true);
      }
    } catch (error: any) {
      console.error('获取数据请求出错:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage(`获取数据错误: ${error.message}`);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };


  // 关闭提示框
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      >
        <div>
          <p>输入内容:</p>
          <TextField
            id="outlined-basic"
            label="请入"
            variant="outlined"
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          保存到数据库
        </Button>
      </Box>


      <Button
        variant="outlined"
        onClick={fetchData}
      >
        显示所有数据
      </Button>

      {/* 数据表格 */}
      {tableData.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="数据表格">
            <TableHead>
              <TableRow>
                {Object.keys(tableData[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.values(row).map((value: any, idx) => (
                    <TableCell key={idx}>{String(value)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
