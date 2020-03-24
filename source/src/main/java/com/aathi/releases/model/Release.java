package com.aathi.releases.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "releasedetails")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
public class Release implements Serializable {
    
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String username;
    private String buildversion;
    private String defects;
    private String userstories;
    private String svnversion;
    private String lastupdatedby;
    
    @Column(nullable = true, updatable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;
    @Column(nullable = true)
    @LastModifiedDate
    private Date updatedAt;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getBuildversion() {
		return buildversion;
	}
	public void setBuildversion(String buildversion) {
		this.buildversion = buildversion;
	}
	public String getDefects() {
		return defects;
	}
	public void setDefects(String defects) {
		this.defects = defects;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	public String getUserstories() {
		return userstories;
	}
	public void setUserstories(String userstories) {
		this.userstories = userstories;
	}
	public String getSvnversion() {
		return svnversion;
	}
	public void setSvnversion(String svnversion) {
		this.svnversion = svnversion;
	}
	
	public String getLastupdatedby() {
		return lastupdatedby;
	}
	public void setLastupdatedby(String lastupdatedby) {
		this.lastupdatedby = lastupdatedby;
	}
	

	@Override
    public String toString() {
        return "User{" + "username='" + username + '\'' + ", buildversion='" + buildversion + '\'' + ", defects='" + defects + '\''
                + ", userstories='" + userstories + '\'' + ", svnversion='" + svnversion + '\'' + ", lastupdatedby='" + lastupdatedby + '\'' 
                + '}';
    }

	
}