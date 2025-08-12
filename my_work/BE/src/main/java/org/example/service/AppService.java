package org.example.service;

import org.example.mapper.AppMapper;
import org.example.mapper.GetDataMapper;
import org.example.model.AppEntity;
import org.example.model.GetDataEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppService {
    private final AppMapper appMapper;

    private final GetDataMapper getDataMapper;

    // 使用构造函数注入（推荐方式）
    @Autowired
    public AppService(AppMapper appMapper, GetDataMapper getDataMapper) {
        this.appMapper = appMapper;
        this.getDataMapper = getDataMapper;
    }

    public void saveAppText(String text){
        AppEntity entity = new AppEntity();
        entity.setContent(text);
        appMapper.insertApp(entity);
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