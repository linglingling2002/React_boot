package org.example.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.example.model.AppEntity;

@Mapper
public interface AppMapper {
    void insertApp(AppEntity appEntity);
}
