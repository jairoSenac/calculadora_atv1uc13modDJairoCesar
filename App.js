import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/',  7, 8, 9, "x", 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '=']

                                             

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")

  
 
  
  

   function calculator(){
    //O método split() divide uma String em uma lista ordenada de substrings, coloca essas substrings em um array e retorna o array. A divisão é feita procurando um padrão, onde o padrão é fornecido como o primeiro parâmetro na chamada do método.
    
    const splitNumbers = currentNumber.split(' ')
    const fistNumber = parseFloat(splitNumbers[0]) 
    const operator = splitNumbers[1]
    const lastNumber = parseFloat(splitNumbers[2])
    
    
    // Faz ação referente tecla pressionada
    switch(operator ){
      case '+':
        setCurrentNumber((fistNumber + lastNumber).toString())
        return
      case '-': 
        setCurrentNumber((fistNumber - lastNumber).toString())
        return
      case 'x':
        setCurrentNumber((fistNumber * lastNumber).toString()) // aqui de
        return
      case '/': 
        setCurrentNumber((fistNumber / lastNumber).toString())
        return

        
             
          
        }
       
  }

  // porcentagem

  function CalcularPorcentagem(){

    const splitNumbers = currentNumber.split(' ')
    const fistNumber = parseFloat(splitNumbers[0]) 
    const operator = splitNumbers[1]
    const lastNumber = parseFloat(splitNumbers[2])
    const porcentagemMaisMenos = (fistNumber * lastNumber)/100
    const porcentagemMultDiv = lastNumber / 100
    
    
    // Faz ação referente tecla pressionada

    switch(operator ){
      case '+':
        setCurrentNumber( ( (fistNumber + porcentagemMaisMenos ) ).toString())
        return
      case '-': 
        setCurrentNumber((fistNumber - porcentagemMaisMenos).toString())
        return
      case 'x':
        setCurrentNumber(( porcentagemMultDiv * fistNumber ).toString()) // aqui de
        return
      case '/': 
        setCurrentNumber((fistNumber/porcentagemMultDiv).toString())
        return

        
          
        }

  }

  // fim porcentagem
  
  function handleInput(buttonPressed){  
    console.log(buttonPressed) // Mostra no Console a tecla pressionada
   
   
    
    
    if(buttonPressed === '+' || buttonPressed === "-" || buttonPressed === "x" || buttonPressed === "/" ){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ") // entre as aspas tem um espaço para separar os numeros
      return
    }


    switch(buttonPressed){
      
      
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      
      
        case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber("") 
        setCurrentNumber("") 
        return
      
      
        case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return

             
      
        case '+/-':
          //setCurrentNumber(Math.abs(currentNumber))
          if(currentNumber > 0){
            setCurrentNumber(currentNumber * -1) // converte de positivo para negativo
          }else{
            setCurrentNumber(Math.abs(currentNumber)) // converte de negativo para positivo
          }
      return

      case '%':
       
        setLastNumber(currentNumber + " % ")
       
        CalcularPorcentagem()
       
        
       

          return

                     
       
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }


  return (
    <View style={styles.container}>

      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>

        {buttons.map((button) => 
          button === '=' ? // Mapeamento do botão =
        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#261070'}]}>
          <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
        </TouchableOpacity>
          : // Mapeamento dos outros botões
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
            <Text style={[styles.textButton, {color: typeof(button) === 'number' ? 'white': '#a9a9a9'}]}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>

    
    
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#261070"
  },
  resultText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    padding: 12,
    textAlign: "right"
  },
  historyText:{
    color: "#a9a9a9",
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
  button: {
    backgroundColor: '#4A0C87',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90, 
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: "#7c7c7c",
    fontSize: 20,
  } 
});