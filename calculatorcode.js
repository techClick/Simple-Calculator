import java.awt.GridLayout; 
import java.awt.BorderLayout; 
import java.awt.event.ActionListener; 
import java.awt.event.ActionEvent; 
import javax.swing.JFrame; 
import javax.swing.JPanel; 
import javax.swing.JTextField; 
import javax.swing.JButton; 
import java.awt.Container; 
public class Hello_Worls implements ActionListener{ 
	JFrame guiFrame; 
	JPanel buttonPanel; 
	JTextField numberCalc; 
	int calcOperation = 0; 
	int currentCalc; 
	String calculationDetails = "";
	//Note: Typically the main method will be in a 
	//separate class. As this is a simple one class 
	//example it's all in the one class. 
	public static void main(String[] args) { 
		//Use the event dispatch thread for Swing components 
		System.out.println("MAIN CALLED");
		Hello_Worls ree = new Hello_Worls();
		ree.SetUpCalcGraphic();
	} 
	private void SetUpCalcGraphic() { 
		guiFrame = new JFrame();
		//make sure the program exits when the frame closes 
		guiFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); 
		guiFrame.setTitle("Simple Calculator"); 
		guiFrame.setSize(300,300); 
		//This will center the JFrame in the middle of the screen 
		guiFrame.setLocationRelativeTo(null);
		numberCalc = new JTextField();
		numberCalc.setHorizontalAlignment(JTextField.RIGHT); 
		numberCalc.setEditable(false); 
		guiFrame.add(numberCalc, BorderLayout.NORTH); 
		//Make a Grid that has three rows and four columns 
		buttonPanel = new JPanel();
		buttonPanel.setLayout(new GridLayout(5,2)); 
		guiFrame.add(buttonPanel, BorderLayout.CENTER); 
		//Add the number buttons 
		addButton(buttonPanel, "C" ); 
		for (int i=0;i<10;i++) { 
			addButton(buttonPanel, String.valueOf(i)); 
		} 
		JButton addButton = new JButton("*"); 
		addButton.setActionCommand("*"); 
		OperatorAction subAction = new OperatorAction(1,"*"); 
		addButton.addActionListener(subAction); 
		JButton subButton = new JButton("-"); 
		subButton.setActionCommand("-"); 
		OperatorAction addAction = new OperatorAction(2,"-"); 
		subButton.addActionListener(addAction); 
		JButton equalsButton = new JButton("="); 
		equalsButton.setActionCommand("="); 
		equalsButton.addActionListener(new ActionListener() { 
			@Override 
			public void actionPerformed(ActionEvent event) { 
				runCalculation();
			} 
		}); 
		buttonPanel.add(addButton); 
		buttonPanel.add(subButton); 
		buttonPanel.add(equalsButton); 
		guiFrame.setVisible(true); 
	} 
	//All the buttons are following the same pattern 
	//so create them all in one place. 
	private void addButton(Container parent, String name ) { 
		JButton but = new JButton(name);
		but.setActionCommand(name); 
		but.addActionListener(this); 
		parent.add(but); 
	} 
	//As all the buttons are doing the same thing it's 
	//easier to make the class implement the ActionListener 
	//interface and control the button clicks from one place
	private void runCalculation() {
		if (!numberCalc.getText().isEmpty() && 
				( calculationDetails != "" && 
					!numberCalc.getText().replace(calculationDetails,"").isEmpty() ) ) { 
			numberCalc.setText(numberCalc.getText().replace(calculationDetails,"")); 
			int number = Integer.parseInt(numberCalc.getText()); 
			if (calcOperation == 1) { 
				int calculate = currentCalc * number; 
				numberCalc.setText(Integer.toString(calculate)); 
			} 
			else if (calcOperation == 2) { 
				int calculate = currentCalc - number; 
				numberCalc.setText(Integer.toString(calculate)); 
			} 
			calculationDetails = "";
		} 
	} 
	@Override 
	public void actionPerformed(ActionEvent event) { 
		//get the Action Command text from the button 
		String action;
		if( event.getActionCommand() == "C" ) {
			numberCalc.setText("");
			calculationDetails = "";
			return;
		}else if ( numberCalc.getText().equals("0") || numberCalc.getText().replace(calculationDetails, "").isEmpty() ) {
			action = event.getActionCommand();
		}else {
			numberCalc.setText(numberCalc.getText().replace(calculationDetails, ""));
			action = numberCalc.getText() + event.getActionCommand();
		}  
		//set the text using the Action Command text
		numberCalc.setText( calculationDetails + action); 
	} 
	private class OperatorAction implements ActionListener { 
		private int operator;
		private String typeOfOperator;
		public OperatorAction(int operation, String type ) { 
			typeOfOperator = type;
			operator = operation; 
		} 
		public void actionPerformed(ActionEvent event) {
			if ( calculationDetails != "" && !numberCalc.getText().replace(calculationDetails,"").isEmpty() ) {
				runCalculation();
			}
			if (!numberCalc.getText().isEmpty()) {
				if ( numberCalc.getText().replace(calculationDetails,"").isEmpty()) {
					currentCalc = Integer.parseInt(numberCalc.getText().replaceAll( " [-*] ", ""));
				}else {
					currentCalc = Integer.parseInt(numberCalc.getText());
				}
				calculationDetails = Integer.toString(currentCalc) + " " + typeOfOperator +
						" ";
				numberCalc.setText( calculationDetails );
				calcOperation = operator;
			}
		} 
	} 		
}
