package com.ravi;

import java.io.File;
import java.io.IOException;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.LineEvent;
import javax.sound.sampled.LineListener;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.UnsupportedAudioFileException;

/**
 *
 * @author RaviS
 */
public class AudioPlayerExample1 implements LineListener {

    boolean playCompleted;

    void play(String audioFilePath) {
	File audioFile = new File(audioFilePath);
	try {
	    AudioInputStream audioStream = AudioSystem.getAudioInputStream(audioFile);
	    AudioFormat format = audioStream.getFormat();
	    DataLine.Info info = new DataLine.Info(Clip.class, format);
	    try (Clip audioClip = (Clip) AudioSystem.getLine(info)) {
		audioClip.addLineListener(this);
		audioClip.open(audioStream);
		audioClip.start();
		
		while (!playCompleted) {
		    try {
			Thread.sleep(1000);
		    } catch (InterruptedException ex) {
			ex.printStackTrace();
		    }
		}
		if (playCompleted) {
		    audioClip.close();
		}
	    }
	} catch (UnsupportedAudioFileException ex) {
	    System.out.println("The specified audio file is not supported.");
	    ex.printStackTrace();
	} catch (LineUnavailableException ex) {
	    System.out.println("Audio line for playing back is unavailable.");
	    ex.printStackTrace();
	} catch (IOException ex) {
	    System.out.println("Error playing the audio file.");
	    ex.printStackTrace();
	}
    }

    @Override
    public void update(LineEvent event) {
	LineEvent.Type type = event.getType();

	if (type == LineEvent.Type.START) {
	    System.out.println("Playback started.");
	} else if (type == LineEvent.Type.STOP) {
	    playCompleted = true;
	    System.out.println("Playback completed.");
	}
    }
}
