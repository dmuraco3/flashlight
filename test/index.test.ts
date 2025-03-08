import { describe, it, expect } from 'bun:test'
import Flashlight, { JavascriptLanguage } from '../src'
import AtomDark from '../src/styles/AtomDark';
import { PythonLanguage } from '../src/languages/Python';

describe('should', () => {
  it('tokenzier', () => {

    const highlighter = new Flashlight([JavascriptLanguage, PythonLanguage], AtomDark);

    const code = `def main():
  my_name = "Dylan Muraco"
  age = 24
  print(my_name + " is " + age + " years old.")`;

    console.log(highlighter.highlight(code, "Python"));


    expect(2).toBe(1)
  })

})
