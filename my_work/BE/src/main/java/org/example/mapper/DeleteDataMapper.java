package org.example.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.example.model.AppEntity;

@Mapper
public interface DeleteDataMapper {
    void deleteById(AppEntity appEntity);
}
