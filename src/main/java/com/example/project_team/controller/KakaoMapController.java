package com.example.project_team.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/MapComponent")
public class KakaoMapController {

    @GetMapping("/api/map-data")
    public Map<String, Double> getMapData() {
        Map<String, Double> mapData = new HashMap<>();
        mapData.put("latitude", 33.450701);
        mapData.put("longitude", 126.570667);
        return mapData;
    }
}

