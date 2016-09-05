package com.simple.base.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;





import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;




public class JsonUtils {

	public HashMap<String, Class<? extends Object>> properties = new HashMap<String, Class<? extends Object>>();
	private static Gson gson = new Gson();
	private static Gson gsonBuilder = new GsonBuilder().create();
	private static JsonUtils instance;

	//private HashMap<String, HashMap<String, Class<? extends Object>>> mappings = new HashMap<String, HashMap<String, Class<? extends Object>>>();

	private JsonUtils() {
	};

	public static final JsonUtils getInstance() {
		if (instance == null) {
			instance = new JsonUtils();
		}
		return instance;
	}

	public void registerMapping(int command, Class<? extends Object> cls) {
		properties.put(command + "", cls);
	}
	public Object  toObjectByMapping(String jsonStr, int command){
		Class<? extends Object> cls = this.properties.get(command + "");
		return this.toJsonObject(jsonStr, cls);
	}


	public void setProperties(HashMap<String, Class<? extends Object>> mapping) {
		properties.clear();
		properties.putAll(mapping);
	}

	
	
	

	@SuppressWarnings("rawtypes")
	public Map<String, Object> copyJSONObject2Map(JSONObject result) {
		HashMap<String, Object> data = new HashMap<String, Object>();
		Iterator it = result.keys();
		while (it.hasNext()) {
			String key = (String) it.next();
			JSONArray json = null;
			try {
				Class<? extends Object> cls = properties.get(key.trim());
				if (cls != null) {
					Object obj = result.get(key);
					if (obj == null) {
						data.put(key, null);
					} else if (obj instanceof JSONArray) {
						json = (JSONArray) obj;
						if (json != null) data.put(key, parseArray(json, cls));
					} else if (obj instanceof JSONObject) {
						data.put(key, toJsonObject(obj.toString(), cls));
					} else {
						data.put(key, obj);
					}
				} else {
					Object object = result.get(key);
					if (object instanceof JSONObject) {
						data.put(key, copyJSONObject2Map((JSONObject) object));
					} else if (object instanceof JSONArray) {
						data.put(key, parseJSONArray((JSONArray) object));
					} else
						data.put(key, result.getString(key));
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		return data;
	}

	public Object[] parseJSONArray(JSONArray array) throws JSONException {
		if (array == null) return new Object[0];
		Object[] objects = new Object[array.length()];
		for (int i = 0; i < array.length(); i++) {
			Object object = array.get(i);
			if (object instanceof JSONObject) {
				objects[i] = copyJSONObject2Map((JSONObject) object);
			} else if (object instanceof JSONArray) {
				objects[i] = parseJSONArray((JSONArray) object);
			} else {
				objects[i] = object;
			}
		}
		return objects;
	}

	
	public <T> List<T> parseArray(JSONArray json, Class<? extends T> cls) {
		if (json == null) return null;
		List<T> data = new ArrayList<T>();
		for (int i = 0; i < json.length(); i++) {
			try {
				if (json.isNull(i)) continue;
				data.add(toJsonObject(json.get(i).toString(), cls));
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		return data;
	}

	public  String toJsonStr(Object obj){
		String jsonStr = gsonBuilder.toJson(obj);
		return jsonStr;
	}
	
	
	public <T> T toJsonObject(String json, Class<T> cls) {
		try{
			return gson.fromJson(json, cls);
			
		}catch(Exception e){
			
			e.printStackTrace();
			return null;
		}
	}
	public JsonObject getJsonObject(String jsonStr){
		JsonObject obj =new JsonParser().parse(jsonStr).getAsJsonObject();
		return obj;
		
		
	}
	

}