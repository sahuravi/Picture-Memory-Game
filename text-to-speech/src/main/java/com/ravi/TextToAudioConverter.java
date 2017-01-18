package com.ravi;

import com.ibm.watson.developer_cloud.text_to_speech.v1.TextToSpeech;
import com.ibm.watson.developer_cloud.text_to_speech.v1.model.AudioFormat;
import com.ibm.watson.developer_cloud.text_to_speech.v1.model.Voice;
import com.ibm.watson.developer_cloud.text_to_speech.v1.util.WaveUtils;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 *
 * @author RaviS
 */
public class TextToAudioConverter {

    public static void textConverter(String text, int count) {
	TextToSpeech service = new TextToSpeech();
	service.setUsernameAndPassword("19c61008-bbeb-4e90-aa43-83e01821da2d", "N0X6kAyl1lRt");

	try {
	    InputStream stream = service.synthesize(text, Voice.EN_ALLISON, AudioFormat.WAV).execute();
	    InputStream in = WaveUtils.reWriteWaveHeader(stream);
	    OutputStream out = new FileOutputStream("Action" + count + "Audio.wav");
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
	try {
	    if(count == 0) {
		TextToAudioConverter.playAudio("Action" + count + "Audio.wav");
	    }
	} catch (IOException e) {
	    e.printStackTrace();
	}
    }

    public static void playAudio(String audioFileName) throws FileNotFoundException, IOException {
	String audioFilePath = audioFileName;
	AudioPlayerExample1 player = new AudioPlayerExample1();
	player.play(audioFilePath);
    }
}
