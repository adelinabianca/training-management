import React, { Component } from 'react';

import styles from './WordCloud.module.scss';
import Wordcloud from 'react-wordcloud';

const CONSTANT = 10;

class WordCloud extends Component {
    constructor(props) {
        super(props);

        this.state = {
            words:  []
        }
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps) {
        const { words } = this.props;
        if (JSON.stringify(words) !== JSON.stringify(prevProps.words)) {
            this.init();
        }
    }

    init = () => {
        const { words } = this.props;
        let mergedMessages = [];
        words.forEach(message => {
            mergedMessages = mergedMessages.concat(message);
        });

        this.setState({ words: this.getFrequency(mergedMessages.join(' ')) });
    }
    
    getFrequency = (text) => {
        const dashedWordsPattern = /(?=\S*['-])([a-zA-Z'-]+)/g;
        const textWithoutDashedWords = text.replace(dashedWordsPattern,"");

        const specialCharsPattern = /[.,-/#!$%^&*;:{}=\-_`~()?!]/g;
        const cleanText = textWithoutDashedWords.replace(specialCharsPattern, "");

        const allWords = cleanText.split(' ');

        const importantWords = allWords.filter(word => word.length >= 5);

        const frequencies = {};

        importantWords.forEach(word => {
            frequencies[word] = frequencies[word] ? frequencies[word] + 1 : 1;
        })

        const frequenciesArray = Object.keys(frequencies)
            .sort((word1, word2) => frequencies[word1] - frequencies[word2])
            .map((word, index) => {
            return { text: word, value: (index + 1) }
        });
        return frequenciesArray
    }

    render() {
      const { words } = this.state;
      return (
          <div>
            <Wordcloud options={{ rotations: 2, rotationAngles: [0, 90] }} words={words} />
          </div>
      )
    }
};

export default WordCloud;