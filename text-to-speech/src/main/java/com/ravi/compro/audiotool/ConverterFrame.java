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

    JLabel sourceFileLabel, destinationFolderLabel;
    JTextField sourceFileTextField, destinationFolderTextField;
    JButton sourceFileBrowseButton, destinationFolderBrowseButton;
    JButton convertButton;
    JLabel imageIconLabel;
    JLabel sourceFileErrorLabel, destinationFolderErrorLabel;

    URL url;
    ImageIcon progressImageIcon;
    ImageIcon successImageIcon;

    JFileChooser fileChooser;
    File file;
    String sourceFilePath, destinationFolderPath;

    public ConverterFrame() {
	frame.setTitle("Text to Audio");

	sourceFileLabel = new JLabel("Source File Path: ");
	sourceFileLabel.setBounds(50, 10, 250, 20);
	frame.add(sourceFileLabel);

	sourceFileTextField = new JTextField("");
	sourceFileTextField.setBounds(50, 30, 300, 20);
	frame.add(sourceFileTextField);

	sourceFileBrowseButton = new JButton("Browse...");
	sourceFileBrowseButton.setBounds(360, 30, 90, 20);
	sourceFileBrowseButton.addActionListener(this);
	frame.add(sourceFileBrowseButton);

	sourceFileErrorLabel = new JLabel("Please choose a File.");
	sourceFileErrorLabel.setBounds(50, 45, 250, 20);
	frame.add(sourceFileErrorLabel);
	sourceFileErrorLabel.setForeground(Color.red);
	sourceFileErrorLabel.setVisible(false);

	destinationFolderLabel = new JLabel("Destination Folder: ");
	destinationFolderLabel.setBounds(50, 65, 250, 20);
	frame.add(destinationFolderLabel);

	destinationFolderTextField = new JTextField("");
	destinationFolderTextField.setBounds(50, 85, 300, 20);
	frame.add(destinationFolderTextField);

	destinationFolderBrowseButton = new JButton("Browse...");
	destinationFolderBrowseButton.setBounds(360, 85, 90, 20);
	destinationFolderBrowseButton.addActionListener(this);
	frame.add(destinationFolderBrowseButton);

	destinationFolderErrorLabel = new JLabel("Please choose a Folder.");
	destinationFolderErrorLabel.setBounds(50, 100, 250, 20);
	frame.add(destinationFolderErrorLabel);
	destinationFolderErrorLabel.setForeground(Color.red);
	destinationFolderErrorLabel.setVisible(false);

	convertButton = new JButton("Convert");
	convertButton.setBounds(50, 125, 100, 20);
	convertButton.addActionListener(this);
	frame.add(convertButton);

	//url = this.getClass().getResource("loading.gif");
	progressImageIcon = new ImageIcon("loading.gif");
	successImageIcon = new ImageIcon("success.gif");

	imageIconLabel = new JLabel(progressImageIcon);
	imageIconLabel.setBounds(200, 150, 100, 100);
	frame.add(imageIconLabel);
	imageIconLabel.setVisible(false);

	//imageIconLabel.setBorder(BorderFactory.createLineBorder(Color.black));
	//imageIconLabel.setBorder(BorderFactory.createLineBorder(Color.black));
	//sourceFileErrorLabel.setBorder(BorderFactory.createLineBorder(Color.black));
	//destinationFolderErrorLabel.setBorder(BorderFactory.createLineBorder(Color.black));
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

	if (e.getSource() == this.sourceFileBrowseButton) {
	    this.sourceFileBrowseButtonHandler();
	} else if (e.getSource() == this.destinationFolderBrowseButton) {
	    this.destinationFolderBrowseButtonHandler();
	} else if (e.getSource() == this.convertButton) {
	    this.convertButtonHandler();
	}
    }

    public void sourceFileBrowseButtonHandler() {

	int x = fileChooser.showOpenDialog(null);
	this.file = this.fileChooser.getSelectedFile();
	this.sourceFilePath = this.file.getPath();

	if (x == JFileChooser.APPROVE_OPTION) {
	    if (!this.file.isDirectory()) {
		this.sourceFileErrorLabel.setVisible(false);
		this.sourceFileTextField.setText(this.sourceFilePath);
	    } else {
		this.sourceFileTextField.setText("");
		this.sourceFileErrorLabel.setVisible(true);
	    }
	}
	if (x == JFileChooser.CANCEL_OPTION) {
	    try {
		//textField.setText("Please select a file/folder");
	    } catch (Exception ex) {
	    }
	}
    }

    public void destinationFolderBrowseButtonHandler() {
	int x = this.fileChooser.showOpenDialog(null);
	this.file = this.fileChooser.getSelectedFile();
	this.destinationFolderPath = this.file.getPath();

	if (x == JFileChooser.APPROVE_OPTION) {
	    if (this.file.isDirectory()) {
		this.destinationFolderErrorLabel.setVisible(false);
		this.destinationFolderTextField.setText(this.destinationFolderPath);
	    } else {
		this.destinationFolderTextField.setText("");
		this.destinationFolderErrorLabel.setVisible(true);
	    }
	}
	if (x == JFileChooser.CANCEL_OPTION) {
	    try {
		//textField.setText("Please select a file/folder");
	    } catch (Exception ex) {
	    }
	}
    }

    public void convertButtonHandler() {
	
	final ConverterFrame obj = this;
	obj.sourceFilePath = obj.sourceFileTextField.getText();
	obj.destinationFolderPath = obj.destinationFolderTextField.getText();
	
	if (obj.sourceFilePath != null) {

	    final Thread successThread;
	    successThread = new Thread() {
		@Override
		public void run() {
		    try {
			obj.imageIconLabel.setIcon(obj.successImageIcon);
		    } catch (Exception ex) {
			ex.printStackTrace();
		    }
		}
	    };

	    Thread worker;
	    worker = new Thread() {
		@Override
		public void run() {
		    try {
			TaskJsonReader.readJson(obj.sourceFilePath, obj.destinationFolderPath);
			successThread.start();
		    } catch (Exception ex) {
			ex.printStackTrace();
		    }
		}
	    };
	    worker.start();

	    obj.imageIconLabel.setVisible(true);
	}
    }
}