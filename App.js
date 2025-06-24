import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// const { width } = Dimensions.get('window');

const buttons = [
  ['C', '⌫', '%', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function Calculator() {
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(true);
  const [isDark, setIsDark] = useState(true);

  const handleTap = (type, value) => {
    switch (type) {
      case 'number':
        if (overwrite || current === 'Error') {
          setCurrent(value);
          setOverwrite(false);
        } else {
          setCurrent(current === '0' ? value : current + value);
        }
        break;

      case 'operator':
        if (previous !== null && operator !== null && !overwrite) {
          const result = calculate(previous, current, operator);
          setPrevious(result);
          setCurrent(result);
        } else {
          setPrevious(current);
        }
        setOperator(value);
        setOverwrite(true);
        break;

      case 'equal':
        if (previous !== null && operator !== null) {
          const result = calculate(previous, current, operator);
          setCurrent(result);
          setPrevious(null);
          setOperator(null);
          setOverwrite(true);
        }
        break;

      case 'clear':
        setCurrent('0');
        setPrevious(null);
        setOperator(null);
        setOverwrite(true);
        break;

      case 'posneg':
        if (current !== '0') {
          setCurrent((parseFloat(current) * -1).toString());
        }
        break;

      case 'percent':
        if (operator && previous !== null) {
          const percentValue = (parseFloat(previous) * parseFloat(current) / 100).toString();
          setCurrent(percentValue);
          setOverwrite(true);
        } else {
          setCurrent((parseFloat(current) / 100).toString());
          setOverwrite(true);
        }
        break;

      case 'dot':
        if (!current.includes('.')) {
          setCurrent(current + '.');
          setOverwrite(false);
        }
        break;
    }
  };

  const calculate = (prev, curr, op) => {
    const a = parseFloat(prev);
    const b = parseFloat(curr);
    if (isNaN(a) || isNaN(b)) return '0';

    switch (op) {
      case '+':
        return (a + b).toString();
      case '-':
        return (a - b).toString();
      case '*':
        return (a * b).toString();
      case '/':
        return b === 0 ? 'Error' : (a / b).toString();
      default:
        return curr;
    }
  };

  const handleOperatorPress = (btn) => {
    if (operator && overwrite) {
      setOperator(btn);
    } else {
      handleTap('operator', btn);
    }
  };

  const getButtonType = (btn) => {
    if (['/', '*', '-', '+', '='].includes(btn)) return 'operator';
    if (['C', '⌫', '%'].includes(btn)) return 'function';
    return 'number';
  };

  const renderButton = (btn) => {
    const buttonType = getButtonType(btn);
    const isZero = btn === '0';

    let onPress;
    switch (btn) {
      case 'C':
        onPress = () => handleTap('clear');
        break;
      case '⌫':
        onPress = () => {
          if (current.length > 1) {
            setCurrent(current.slice(0, -1));
            setOverwrite(false);
          } else {
            setCurrent('0');
            setOverwrite(true);
          }
        };
        break;
      case '%':
        onPress = () => handleTap('percent');
        break;
      case '.':
        onPress = () => handleTap('dot');
        break;
      case '=':
        onPress = () => handleTap('equal');
        break;
      default:
        onPress = buttonType === 'operator'
          ? () => handleOperatorPress(btn)
          : () => handleTap('number', btn);
        break;
    }

    const buttonStyle = [
      styles.button,
      isZero && styles.zeroButton,
      buttonType === 'operator' && (isDark ? styles.operatorButtonDark : styles.operatorButtonLight),
      buttonType === 'function' && (isDark ? styles.functionButtonDark : styles.functionButtonLight),
      buttonType === 'number' && (isDark ? styles.numberButtonDark : styles.numberButtonLight),
    ];

    const textStyle = [
      styles.buttonText,
      buttonType === 'operator' && styles.operatorText,
      !isDark && buttonType === 'number' && styles.numberTextLight,
      !isDark && buttonType === 'function' && styles.functionTextLight,
    ];

    return (
      <TouchableOpacity
        key={btn}
        style={buttonStyle}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={textStyle}>{btn}</Text>
      </TouchableOpacity>
    );
  };

  const themeColors = isDark ? {
    background: ['#1a1a1a', '#2d2d2d', '#1a1a1a'],
    displayBg: ['#2a2a2a', '#3a3a3a'],
    primary: '#ff9500',
    secondary: '#666',
    text: '#fff',
    subText: '#888',
  } : {
    background: ['#f0f4ff', '#ffffff', '#e6f2ff'],
    displayBg: ['#ffffff', '#f8faff'],
    primary: '#007AFF',
    secondary: '#8E8E93',
    text: '#000',
    subText: '#666',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background[0] }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <LinearGradient
        colors={themeColors.background}
        style={styles.container}
        locations={[0, 0.5, 1]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Calculator
          </Text>
          <TouchableOpacity
            style={[styles.themeToggle, { backgroundColor: isDark ? '#333' : '#fff' }]}
            onPress={() => setIsDark(!isDark)}
            activeOpacity={0.7}
          >
            <Text style={[styles.themeIcon, { color: themeColors.primary }]}>
              {isDark ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display Container */}
        <LinearGradient
          colors={themeColors.displayBg}
          style={styles.displayContainer}
          locations={[0, 1]}
        >
          <View style={styles.displayContent}>
            {/* Previous Number */}
            <Text style={[styles.previousText, { color: themeColors.subText }]}>
              {previous !== null ? previous : ''}
            </Text>

            {/* Current Display */}
            <View style={styles.currentDisplay}>
              <Text style={[styles.currentOperator, { color: themeColors.primary }]}>
                {operator || ''}
              </Text>
              <Text
                style={[styles.currentText, { color: themeColors.text }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.5}
              >
                {current}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Buttons Grid */}
        <View style={styles.buttonsContainer}>
          {buttons.map((row, i) => (
            <View key={i} style={styles.row}>
              {row.map(renderButton)}
            </View>
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  themeToggle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  themeIcon: {
    fontSize: 24,
  },
  displayContainer: {
    minHeight: 140,
    borderRadius: 25,
    padding: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  displayContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  previousText: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: '300',
  },
  currentDisplay: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '100%',
  },
  currentOperator: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 12,
  },
  currentText: {
    fontSize: 48,
    fontWeight: '200',
    flex: 1,
    textAlign: 'right',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    height: 70,
    marginHorizontal: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  zeroButton: {
    flex: 2,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '500',
  },

  // Dark theme buttons
  operatorButtonDark: {
    backgroundColor: '#ff9500',
  },
  functionButtonDark: {
    backgroundColor: '#666',
  },
  numberButtonDark: {
    backgroundColor: '#333',
  },

  // Light theme buttons
  operatorButtonLight: {
    backgroundColor: '#007AFF',
  },
  functionButtonLight: {
    backgroundColor: '#E5E5EA',
  },
  numberButtonLight: {
    backgroundColor: '#F2F2F7',
  },

  // Text colors
  operatorText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  numberTextLight: {
    color: '#000',
  },
  functionTextLight: {
    color: '#000',
  },
});