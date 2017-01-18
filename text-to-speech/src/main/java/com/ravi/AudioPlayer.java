/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ravi;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

/**
 *
 * @author RaviS
 */
public class AudioPlayer implements ActionListener {

    JFrame frame = new JFrame();
    int count = 3;
    boolean audioCreated = false;

    JLabel actionLabelArray[];
    JTextField actionTextArray[];
    JButton buttonArray[];

    JLabel action1Lable;
    JTextField action1TextField;
    JButton action1Button;

    JLabel action2Lable;
    JTextField action2TextField;
    JButton action2Button;

    JLabel action3Lable;
    JTextField action3TextField;
    JButton action3Button;

    public AudioPlayer() {
	frame.setTitle("Text to Audio");

	action1Lable = new JLabel("Action Text: ");
	action1Lable.setBounds(15, 20, 250, 30);
	frame.add(action1Lable);

	action1TextField = new JTextField("Action 1 text");
	action1TextField.setBounds(90, 25, 250, 20);
	frame.add(action1TextField);

	action1Button = new JButton("Play");
	action1Button.setBounds(360, 25, 70, 20);
	action1Button.addActionListener(this);
	frame.add(action1Button);

	action2Lable = new JLabel("Action Text: ");
	action2Lable.setBounds(15, 60, 250, 30);
	frame.add(action2Lable);

	action2TextField = new JTextField("Action 2 text");
	action2TextField.setBounds(90, 65, 250, 20);
	frame.add(action2TextField);

	action2Button = new JButton("Play");
	action2Button.setBounds(360, 65, 70, 20);
	action2Button.addActionListener(this);
	frame.add(action2Button);

	action3Lable = new JLabel("Action Text: ");
	action3Lable.setBounds(15, 100, 250, 30);
	frame.add(action3Lable);

	action3TextField = new JTextField("Action 3 text");
	action3TextField.setBounds(90, 105, 250, 20);
	frame.add(action3TextField);

	action3Button = new JButton("Play");
	action3Button.setBounds(360, 105, 70, 20);
	action3Button.addActionListener(this);
	frame.add(action3Button);

	frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	frame.setSize(500, 400);
	frame.setLayout(null);
	frame.setVisible(true);
	frame.setLocation(500, 100);
    }

    public static void main(String[] args) {
	new AudioPlayer();
    }

    @Override
    public void actionPerformed(ActionEvent e) {

	if (e.getSource() == this.action1Button) {
	    if (audioCreated == false) {
		audioCreated = true;
		final String text[] = new String[count];

		text[0] = this.action1TextField.getText();
		text[1] = this.action2TextField.getText();
		text[2] = this.action3TextField.getText();

		Thread worker = new Thread() {
		    @Override
		    public void run() {
			for (int i = 0; i < count; i++) {
			    try {
				TextToAudioConverter.textConverter(text[i], i);
			    } catch (Exception ex) {
				ex.printStackTrace();
			    }
			}
		    }
		};
		worker.start();
	    } else {
		AudioPlayer.startAudioPlayer("Action0Audio.wav");
	    }
	} else if (e.getSource() == this.action2Button) {
	    AudioPlayer.startAudioPlayer("Action1Audio.wav");
	} else if (e.getSource() == this.action3Button) {
	    AudioPlayer.startAudioPlayer("Action2Audio.wav");
	}
    }

    public static void startAudioPlayer(String filepath) {
	try {
	    TextToAudioConverter.playAudio(filepath);
	} catch (IOException ex) {
	    ex.printStackTrace();
	}
    }
}
