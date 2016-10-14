package com.simple.core.base.user.entity;


import java.sql.Date;
import java.sql.Timestamp;

//import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import javax.persistence.Table;

//import org.codehaus.jackson.annotate.JsonIgnore;

@Entity

public class UserClientInfo{
	///private static final long serialVersionUID = 199363582930644060L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private	Long	userId;
	private	String	channelId;
	private	String	productId;
	private	String	simId;
	private	String	deviceId;
	private	Byte	platformType;
	private	Byte	isControl;
	private	String	softVersion;
	private	String	phoneModel;
	private	Byte	serviceProvider;
	private	Byte	networkType;
	
	private	Timestamp	loginBeginTime;
	private	Timestamp	loginEndTime;
	private	Date	createDate;
	private	Byte	status;
	private	Byte	loginStatus;
	private	Byte createMonth;


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	
	//@Column(name="channel_id", length=6)	
	public String getChannelId() {
		return channelId;
	}
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}
	
	///@Column(name="product_id", length=30)	
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	
	//@Column(name="sim_id", length=85)	
	public String getSimId() {
		return simId;
	}
	public void setSimId(String simId) {
		this.simId = simId;
	}
	
	//@Column(name="device_id", length=32)	
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	
	//@Column(name="platform_type", length=4)	
	public Byte getPlatformType() {
		return platformType;
	}
	public void setPlatformType(Byte platformType) {
		this.platformType = platformType;
	}
	
	//@Column(name="is_control", length=4)	
	public Byte getIsControl() {
		return isControl;
	}
	public void setIsControl(Byte isControl) {
		this.isControl = isControl;
	}
	
	//@Column(name="soft_version", length=40)	
	public String getSoftVersion() {
		return softVersion;
	}
	public void setSoftVersion(String softVersion) {
		this.softVersion = softVersion;
	}
	
	//@Column(name="phone_model", length=100)	
	public String getPhoneModel() {
		return phoneModel;
	}
	public void setPhoneModel(String phoneModel) {
		this.phoneModel = phoneModel;
	}
	
	//@Column(name="service_provider", length=4)	
	public Byte getServiceProvider() {
		return serviceProvider;
	}
	public void setServiceProvider(Byte serviceProvider) {
		this.serviceProvider = serviceProvider;
	}
	
	//@Column(name="network_type", length=4)	
	public Byte getNetworkType() {
		return networkType;
	}
	public void setNetworkType(Byte networkType) {
		this.networkType = networkType;
	}
	
	//@Column(name="user_id", length=20)	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	//@Column(name="login_begin_time")	
	//@JsonIgnore
	public Timestamp getLoginBeginTime() {
		return loginBeginTime;
	}
	public void setLoginBeginTime(Timestamp loginBeginTime) {
		this.loginBeginTime = loginBeginTime;
	}
	
	//@Column(name="login_end_time")	
	///@JsonIgnore
	public Timestamp getLoginEndTime() {
		return loginEndTime;
	}
	public void setLoginEndTime(Timestamp loginEndTime) {
		this.loginEndTime = loginEndTime;
	}
	
	//@Column(name="create_date")	
	//@JsonIgnore
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	//@Column(name="status", length=4)	
	public Byte getStatus() {
		return status;
	}
	public void setStatus(Byte status) {
		this.status = status;
	}
	
	//@Column(name="login_status", length=4)	
	public Byte getLoginStatus() {
		return loginStatus;
	}
	public void setLoginStatus(Byte loginStatus) {
		this.loginStatus = loginStatus;
	}
	
	//@Column(name="create_month", length=4)	
	public Byte getCreateMonth() {
		return createMonth;
	}
	public void setCreateMonth(Byte createMonth) {
		this.createMonth = createMonth;
	}

}
