// Requiring the module
const reader = require('xlsx')
const path = require('path');

class dataHandling{


async readtestdatafromexcel(strFileName,strSheetName,strTestCaseName)
{
        try
        {
            
            //const reader = require('xlsx')
            //const fs = require('fs')

            // const path = require('path');
            //   const fullPath = './test/test.txt';

            //   const directoryName = path.dirname(fullPath);
            //   const fileName = path.basename(fullPath);

            //   console.log('Directory:', directoryName); // Output: /path/to
            //   console.log('File:', fileName); // Output: myFile.txt

            // Reading our test file
            //const file = reader.readFile('./test.xlsx')
            //let filePath = path.resolve('src')
            //console.log(filePath1)
            //const filePath = path.join(__dirname, 'testdata', strFileName);

            //console.log(filePath);
            //const file = reader.readFile('./testdata/test.xlsx')

            let filePath = path.resolve('src')

            filePath = path.join(filePath, 'testdata', strFileName);

            console.log(filePath)

            const file = reader.readFile(filePath);

            //console.log(file)

            //const sheets = file.SheetNames[0];

            const sheet = file.Sheets[strSheetName]
            //console.log(reader.utils.sheet_to_json(sheet))

            let temp1 = []

            temp1 = reader.utils.sheet_to_json(sheet).filter(item => item.TestCaseName === strTestCaseName)

            return temp1
    } catch (error) 
    {
        throw new Error(error.message);
    }
}


}
export default dataHandling;
