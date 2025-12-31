package org.example.service;

import org.example.mapper.AppMapper;
import org.example.mapper.GetDataMapper;
import org.example.mapper.DeleteDataMapper;
import org.example.model.AppEntity;
import org.example.model.GetDataEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppService {
    private final AppMapper appMapper;

    private final GetDataMapper getDataMapper;

    private final DeleteDataMapper deleteDataMapper;

    /**
     * 构造
     *
     * @param appMapper appMapper
     * @param getDataMapper getDataMapper
     * @param deleteDataMapper deleteDataMapper
     */
    @Autowired   // 使用构造函数注入（推荐方式）
    public AppService(AppMapper appMapper, GetDataMapper getDataMapper,
            DeleteDataMapper deleteDataMapper) {
        this.appMapper = appMapper;
        this.getDataMapper = getDataMapper;
        this.deleteDataMapper = deleteDataMapper;
    }

    /**
     * 新增数据
     *
     * @param text content
     */
    public void saveAppText(String text){
        AppEntity entity = new AppEntity();
        entity.setContent(text);
        appMapper.insertApp(entity);
    }

    /**
     * 用id删除数据
     *
     * @param id id
     */
    public void deleteById(String id){
        AppEntity entity = new AppEntity();
        entity.setId(id);
        deleteDataMapper.deleteById(entity);
    }

    /**
     * 获取所有数据
     *
     * @return 数据列表
     */
    public List<GetDataEntity> getAllData() {
        return getDataMapper.searchData();
    }
}