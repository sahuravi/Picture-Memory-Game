/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ravi.compro.audiotool;

import java.io.FileReader;
import java.io.IOException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author RaviS
 */
public class TaskJsonReader {

    public static void readJson(String filePath) {
	JSONParser parser = new JSONParser();

	try {
	    Object obj = parser.parse(new FileReader(filePath));
	    JSONObject jsonObject = (JSONObject) obj;
	    JSONObject taskJsonObject = (JSONObject) jsonObject.get("discreteActions");
	    String taskName = (String) jsonObject.get("taskid");

	    for (Object stepKey : taskJsonObject.keySet()) {
		String stepKeyString = (String) stepKey;
		Object stepObject = taskJsonObject.get(stepKeyString);
		JSONObject stepArrayJsonObject = (JSONObject) stepObject;

		for (Object actionKey : stepArrayJsonObject.keySet()) {
		    String actionArrayKeyString = (String) actionKey;
		    Object actionArrayObject = stepArrayJsonObject.get(actionArrayKeyString);
		    JSONObject actionArrayJsonObject = (JSONObject) actionArrayObject;

		    for (Object key : actionArrayJsonObject.keySet()) {
			String actionKeyString = (String) key;
			Object actionObject = actionArrayJsonObject.get(actionKeyString);
			JSONObject actionJsonObject = (JSONObject) actionObject;

			String actionText = actionJsonObject.get("text").toString();
			String destinationPath = taskName + "\\" + stepKeyString + "\\" + actionArrayKeyString + "." + actionKeyString + ".wav";
			TextConverter.textConverter(actionText, destinationPath);
		    }
		}
	    }
	    System.out.println("Done.");
	} catch (IOException | ParseException e) {
	    e.printStackTrace();
	}
    }
}
