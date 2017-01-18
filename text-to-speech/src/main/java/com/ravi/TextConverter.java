/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ravi;

import com.ibm.watson.developer_cloud.text_to_speech.v1.TextToSpeech;
import com.ibm.watson.developer_cloud.text_to_speech.v1.model.AudioFormat;
import com.ibm.watson.developer_cloud.text_to_speech.v1.model.Voice;
import com.ibm.watson.developer_cloud.text_to_speech.v1.util.WaveUtils;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 *
 * @author RaviS
 */
public class TextConverter {

    @SuppressWarnings("ConvertToTryWithResources")
    public static void textConverter(String text, String filePath) {
	TextToSpeech service = new TextToSpeech();
	service.setUsernameAndPassword("19c61008-bbeb-4e90-aa43-83e01821da2d", "N0X6kAyl1lRt");

	try {
	    InputStream stream;
	    stream = service.synthesize(text, Voice.EN_ALLISON, AudioFormat.WAV).execute();
	    InputStream in = WaveUtils.reWriteWaveHeader(stream);
	    File fileDirectory = new File(filePath);
	    //fileDirectory.mkdirs();
	    fileDirectory.getParentFile().mkdirs();
	    fileDirectory.createNewFile();
	    OutputStream out = new FileOutputStream(filePath);
	    
	    byte[] buffer = new byte[1024];
	    int length;
	    while ((length = in.read(buffer)) > 0) {
		out.write(buffer, 0, length);
	    }
	    out.close();
	    in.close();
	    stream.close();
	} catch (IOException e) {
	    e.printStackTrace();
	}

    }
}
