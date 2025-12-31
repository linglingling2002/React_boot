package org.example.controller;

import org.example.dto.AppRequest;
import org.example.dto.DeleteRequest;
import org.example.model.GetDataEntity;
import org.example.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AppController {

    private final AppService appService;

    @Autowired
    public AppController(AppService appService) {
        this.appService = appService;
    }

    @PostMapping("/saveText")
    public ResponseEntity<String> saveText(@RequestBody AppRequest request) {
        try {
            appService.saveAppText(request.getContent());
            return ResponseEntity.ok("保存成功");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("保存数据失败~: " + e.getMessage());
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteById(@RequestBody DeleteRequest request) {
        try {
            appService.deleteById(request.getId());
            return ResponseEntity.ok("删除成功");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("删除数据失败^^: " + e.getMessage());
        }
    }

    @GetMapping("/getAllData")
    public ResponseEntity<?> getAllData() {
        try {
            List<GetDataEntity> dataList = appService.getAllData();
            return ResponseEntity.ok(dataList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("获取数据失败: " + e.getMessage());
        }
    }
}