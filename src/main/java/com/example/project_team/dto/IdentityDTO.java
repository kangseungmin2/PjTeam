package com.example.project_team.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "team_identity")
@Data
public class IdentityDTO {

    @Id
    private String name;
    private int identityNum;

    @Lob
    @Column(name = "image", columnDefinition = "BLOB")
    private byte[] image;
}
