import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, FunctionOutlined, RocketOutlined, RollbackOutlined } from '@ant-design/icons';
import { Input, Tabs } from 'antd';
import { Link } from 'react-router-dom';

const AlphabetCipher = () => {
    const [key, setKey] = useState('');
    const [plainText, setPlainText] = useState('');
    const [cipherText, setCipherText] = useState('');
    const [decodedResult, setDecodedResult] = useState('');
    const [grid, setGrid] = useState([]);

    const alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    ];
    const placeHolderLetter = 'x';


    const generateGrid = (key) => {
        const keyCleaned = key.replaceAll(/[^A-Za-z ]/gi, '').replaceAll('j', 'i').toLowerCase(); // Include space in regex
        const uniqueMatrix = Array.from(new Set([...keyCleaned.split(''), ...alphabet])); // Split key by spaces

        const splittedArray = [];
        while (uniqueMatrix.length) {
            splittedArray.push(uniqueMatrix.splice(0, 5));
        }

        setGrid(splittedArray);
    };




    const getChunksOfString = (plainTextWithoutSpace) => {
        let ptws = '';

        for (let k = 0; k < plainTextWithoutSpace.length; k++) {
            const currentLetter = plainTextWithoutSpace[k];
            if (k + 1 !== plainTextWithoutSpace.length) {
                let nextLetter = plainTextWithoutSpace[k + 1];
                if (currentLetter === nextLetter) {
                    ptws += currentLetter + placeHolderLetter;
                } else {
                    ptws += currentLetter + nextLetter;
                    k++;
                }
            } else {
                ptws += currentLetter;
            }
        }

        let chunks = [];

        for (let i = 0, charsLength = ptws.length; i < charsLength; i += 2) {
            chunks.push(ptws.substring(i, i + 2));
        }

        let lastChunk = chunks[chunks.length - 1];
        if (lastChunk.length === 1) {
            chunks[chunks.length - 1] = lastChunk + placeHolderLetter;
        }

        return chunks;
    };

    const encrypt = (plainText, grid) => {
        let plainTextWithoutSpace = plainText.replaceAll(' ', '').replaceAll('j', 'i').toLowerCase();
        let chunksOfWord = getChunksOfString(plainTextWithoutSpace);
        let cipherTextBuilder = '';

        chunksOfWord.forEach((letterCombo) => {
            let firstLetter = letterCombo[0];
            let secondLetter = letterCombo[1];

            if (firstLetter === placeHolderLetter || secondLetter === placeHolderLetter) {
                // If either letter is a placeholder, it represents a space
                cipherTextBuilder += ' '; // Preserve the space
            } else {
                let firstLetterRow = -1;
                let firstLetterColumn = -1;
                let secondLetterRow = -1;
                let secondLetterColumn = -1;

                for (let i = 0; i < grid.length; i++) {
                    let row = grid[i];
                    if (row.indexOf(firstLetter) !== -1) {
                        firstLetterRow = i;
                        firstLetterColumn = row.indexOf(firstLetter);
                    }
                    if (row.indexOf(secondLetter) !== -1) {
                        secondLetterRow = i;
                        secondLetterColumn = row.indexOf(secondLetter);
                    }
                }

                if (firstLetterRow === secondLetterRow) {
                    if (++firstLetterColumn === 5) {
                        firstLetterColumn = 0;
                    }

                    if (++secondLetterColumn === 5) {
                        secondLetterColumn = 0;
                    }
                } else if (firstLetterColumn === secondLetterColumn) {
                    if (++firstLetterRow === 5) {
                        firstLetterRow = 0;
                    }

                    if (++secondLetterRow === 5) {
                        secondLetterRow = 0;
                    }
                } else {
                    let temp = firstLetterColumn;
                    firstLetterColumn = secondLetterColumn;
                    secondLetterColumn = temp;
                }

                cipherTextBuilder += grid[firstLetterRow][firstLetterColumn];
                cipherTextBuilder += grid[secondLetterRow][secondLetterColumn];
            }
        });

        return cipherTextBuilder;
    };

    const decrypt = (cipherText, grid) => {
        let cipherTextWithoutSpace = cipherText.replaceAll(' ', '').toLowerCase();
        let chunks = [];

        for (let i = 0, charsLength = cipherTextWithoutSpace.length; i < charsLength; i += 2) {
            chunks.push(cipherTextWithoutSpace.substring(i, i + 2));
        }

        let plainTextBuilder = '';

        chunks.forEach((letterCombo) => {
            let firstLetter = letterCombo[0];
            let secondLetter = letterCombo[1];

            if (firstLetter === placeHolderLetter || secondLetter === placeHolderLetter) {
                // If either letter is a placeholder, it represents a space
                plainTextBuilder += ' '; // Insert the preserved space
            } else {
                let firstLetterRow = 0;
                let firstLetterColumn = 0;
                let secondLetterRow = 0;
                let secondLetterColumn = 0;

                for (let i = 0; i < grid.length; i++) {
                    let row = grid[i];
                    if (row.indexOf(firstLetter) !== -1) {
                        firstLetterRow = i;
                        firstLetterColumn = row.indexOf(firstLetter);
                    }
                    if (row.indexOf(secondLetter) !== -1) {
                        secondLetterRow = i;
                        secondLetterColumn = row.indexOf(secondLetter);
                    }
                }

                if (firstLetterRow === secondLetterRow) {
                    if (--firstLetterColumn === -1) {
                        firstLetterColumn = 4;
                    }

                    if (--secondLetterColumn === -1) {
                        secondLetterColumn = 4;
                    }
                } else if (firstLetterColumn === secondLetterColumn) {
                    if (--firstLetterRow === -1) {
                        firstLetterRow = 4;
                    }

                    if (--secondLetterRow === -1) {
                        secondLetterRow = 4;
                    }
                } else {
                    let temp = firstLetterColumn;
                    firstLetterColumn = secondLetterColumn;
                    secondLetterColumn = temp;
                }

                plainTextBuilder += grid[firstLetterRow][firstLetterColumn];
                plainTextBuilder += grid[secondLetterRow][secondLetterColumn];
            }
        });

        return plainTextBuilder;
    };


    const EncodeDecode = () => {
        const keyCleaned = key.replaceAll(/[^A-Za-z]/gi, '').replaceAll('j', 'i').toLowerCase();
        setKey(keyCleaned);
        let chiperPlain = plainText.replaceAll(' ', '').toLowerCase();

        generateGrid(keyCleaned);

        if (chiperPlain !== '' && grid.length > 0) { // Check if grid is properly initialized
            setCipherText(encrypt(chiperPlain, grid));
            setDecodedResult(decrypt(cipherText, grid)); // Decrypt the cipher text
        }
    };

    return (
        <>
            <div className='container d-flex justify-content-center'>
                <h1>playFair Cipher</h1>
            </div>
            <Tabs
                defaultActiveKey="1"
                centered
                className='tabs'
                items={[
                    {
                        label: 'Encode',
                        key: '1',
                        children: (
                            <div className='container card-page'>
                                <div className='card container'>
                                    <Input
                                        prefix={<EyeOutlined />}
                                        className="site-form-item-icon input-card "
                                        placeholder="Enter text to encode"
                                        id="chiperPlain"
                                        value={plainText}
                                        onChange={(e) => setPlainText(e.target.value)}
                                    />
                                    <Input
                                        prefix={<FunctionOutlined />}
                                        className="site-form-item-icon input-card mt-4"
                                        placeholder="Enter key"
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                    />
                                    <Input
                                        prefix={<EyeInvisibleOutlined />}
                                        className="site-form-item-icon input-card mt-4"
                                        placeholder="Encoded result"
                                        readOnly
                                        id="cipherText"
                                        value={cipherText}
                                    />
                                    <button className="btn btn-primary mt-4" onClick={EncodeDecode}><RocketOutlined /> Encode <RocketOutlined /> </button>
                                </div>
                            </div>
                        ),
                    },
                    {
                        label: 'Decode',
                        key: '2',
                        children: (
                            <div className='container card-page'>
                                <div className='card container'>
                                    <Input
                                        prefix={<EyeInvisibleOutlined />}
                                        className="site-form-item-icon input-card "
                                        placeholder="Enter text to decode"
                                        id="cipherText"
                                        value={cipherText}
                                        onChange={(e) => setCipherText(e.target.value)}
                                    />
                                    <Input
                                        prefix={<FunctionOutlined />}
                                        className="site-form-item-icon input-card mt-4"
                                        placeholder="Enter key"
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                    />
                                    <Input
                                        prefix={<EyeOutlined />}
                                        className="site-form-item-icon input-card mt-4"
                                        placeholder="Decoded result"
                                        readOnly
                                        id="plainText"
                                        value={decodedResult}
                                    />
                                    <button className="btn btn-primary mt-4" onClick={EncodeDecode}><RocketOutlined /> Decode <RocketOutlined /> </button>
                                </div>
                            </div>
                        ),
                    },
                ]}
            />
            <div className='container d-flex justify-content-center'>
                <Link to="/"><button className='btn btn-primary-back'><RollbackOutlined />  back To Home </button></Link>
            </div>
        </>
    );
};

export default AlphabetCipher;
