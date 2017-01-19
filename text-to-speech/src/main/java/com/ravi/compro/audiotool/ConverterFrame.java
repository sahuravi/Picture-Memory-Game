/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ravi.compro.audiotool;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.net.URL;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

/**
 *
 * @author ravis
 */
public class ConverterFrame implements ActionListener {
    
    JFrame frame = new JFrame();
    
    JLabel textFieldLabel;
    JTextField filePathTextField;
    JButton BrowseButton;
    JButton convertButton;
    JLabel imageIconLabel;
    JLabel errorLabel;
    
    URL url;
    ImageIcon progressImageIcon;
    ImageIcon successImageIcon;
    
    JFileChooser fileChooser;
    File file;
    String filePath;
    
    public ConverterFrame() {
	frame.setTitle("Text to Audio");
	
	textFieldLabel = new JLabel("File Path : ");
	textFieldLabel.setBounds(15, 20, 250, 30);
	frame.add(textFieldLabel);
	
	filePathTextField = new JTextField("Action 1 text");
	filePathTextField.setBounds(90, 25, 250, 20);
	frame.add(filePathTextField);
	
	BrowseButton = new JButton("Browse...");
	BrowseButton.setBounds(350, 25, 90, 20);
	BrowseButton.addActionListener(this);
	frame.add(BrowseButton);
	
	errorLabel = new JLabel("Please choose a correct file.");
	errorLabel.setBounds(90, 37, 250, 30);
	frame.add(errorLabel);
	errorLabel.setForeground(Color.red);
	errorLabel.setVisible(false);
	
	convertButton = new JButton("Convert");
	convertButton.setBounds(90, 65, 100, 20);
	convertButton.addActionListener(this);
	frame.add(convertButton);

	//url = this.getClass().getResource("loading.gif");
	progressImageIcon = new ImageIcon("loading.gif");
	successImageIcon = new ImageIcon("success.gif");
	
	imageIconLabel = new JLabel(progressImageIcon);
	imageIconLabel.setBounds(200, 150, 100, 100);
	frame.add(imageIconLabel);
	//imageIconLabel.setBorder(BorderFactory.createLineBorder(Color.black));
	imageIconLabel.setVisible(false);
	
	fileChooser = new JFileChooser("D:\\");
	fileChooser.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
	
	frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	frame.setSize(500, 400);
	frame.setLayout(null);
	frame.setVisible(true);
	frame.setLocation(500, 100);
    }
    
    public static void main(String[] args) {
	new ConverterFrame();
    }
    
    @Override
    public void actionPerformed(ActionEvent e) {
	
	if (e.getSource() == this.BrowseButton) {
	    
	    int x = fileChooser.showOpenDialog(null);
	    file = fileChooser.getSelectedFile();
	    filePath = file.getPath();
	    
	    if (x == JFileChooser.APPROVE_OPTION) {
		//filesTextArea.setText("");	//To empty the textfield for the new files...
		if (!file.isDirectory()) {
		    errorLabel.setVisible(false);
		    filePathTextField.setText(filePath);
		} else {
		    filePathTextField.setText("");
		    errorLabel.setVisible(true);
		}
	    }
	    if (x == JFileChooser.CANCEL_OPTION) {
		try {
		    //textField.setText("Please select a file/folder");
		} catch (Exception ex) {
		}
	    }
	} else if (e.getSource() == this.convertButton) {
	    if (this.filePath != null) {
		imageIconLabel.setVisible(true);
		TaskJsonReader.readJson(this.filePath);
		imageIconLabel.setIcon(successImageIcon);
		
	    }
	}
    }
}
