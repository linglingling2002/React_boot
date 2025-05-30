package org.example.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.example.model.GetDataEntity;

import java.util.List;

@Mapper
public interface GetDataMapper {
    List<GetDataEntity> searchData();
}
