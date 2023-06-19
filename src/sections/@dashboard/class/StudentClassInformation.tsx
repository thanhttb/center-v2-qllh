import React, { useState } from 'react';
import './App.css';
import {
  SheetDirective,
  SheetsDirective,
  RangesDirective,
  RangeDirective,
  SpreadsheetComponent,
  ColumnsDirective,
  ColumnDirective,
  RowsDirective,
  RowDirective,
  CellsDirective,
  CellDirective,
  ConditionalFormatsDirective,
  ConditionalFormatDirective,
  CellRenderEventArgs,
  ColumnModel,
  RowModel,
  ConditionalFormatModel,
  SheetModel
} from '@syncfusion/ej2-react-spreadsheet';
import { FormattingData, jsonData } from './data';
function StudentClassInformation() {
  const [freezeRowCount, setCount] = useState(5);
  let ssObj: SpreadsheetComponent;
  const onCreated = () => {
    ssObj.numberFormat('$#,##0.00', 'D3:F18');
    // ssObj.cellFormat({fontWeight:"bold", textAlign:"center", verticalAlign:"middle", fontSize:"13pt",
    //         backgroundColor:"#1E88E5", color:"#ffffff"}, "A1");
    ssObj.cellFormat(
      { fontWeight: 'bold', textAlign: 'center', backgroundColor: '#BBDEFB' },
      'A2:I2'
    );
    ssObj.cellFormat({ backgroundColor: '#F9FBE7' }, 'A3:F18');
    // ssObj.conditionalFormat({type:"BlueDataBar", range: "D3:D18"});
    ssObj.conditionalFormat({ type: 'GreenDataBar', range: 'E3:E18' });
    ssObj.conditionalFormat({ type: 'ThreeStars', range: 'H3:H18' });
    //Add Data validation to range.
    ssObj.addDataValidation(
      { type: 'List', value1: 'Mon, Tue, Wed, Thu, Fri', ignoreBlank: false },
      'H3:H18'
    );
  };

  //   function beforeCellRender(args: CellRenderEventArgs): void {
  //     if (ssObj.sheets[ssObj.activeSheetIndex].name === 'Order Details' && !ssObj.isOpen) {
  //         if (args.cell && args.cell.value) {
              //Applying cell formatting before rendering the particular cell.
  //             switch (args.cell.value) {
  //                 case 'Laser Printer':
  //                     ssObj.cellFormat({ color: '#10c469', textDecoration: 'line-through' }, args.address);
  //                     break;
  //                 case 'Shipped':
  //                     ssObj.cellFormat({ color: '#62c9e8' }, args.address);
  //                     break;
  //                 case 'Pending':
  //                     ssObj.cellFormat({ color: '#FFC107', textDecoration: 'underline' }, args.address);
  //                     break;
  //                 case 'Cancelled':
  //                     ssObj.cellFormat({ color: '#ff5b5b' }, args.address);
  //                     break;
  //             }
  //         }
  //     }
  // }

  const conditionalFormatSettings: ConditionalFormatModel[] = [
    {
      type: 'LessThan',
      value: '20',
      range: 'A3:G18',
      format: { style: {
        backgroundColor: '#FF0000'
      } } // Apply red background color when the condition is met
    }
  ];

  const sheets: SheetModel[] = [
    {
      ranges: [
        {
          dataSource: conditionalFormatSettings
        }
      ]
    }
  ];

  return (
    <div className="App">
      <SpreadsheetComponent 
      ref={((s:SpreadsheetComponent)=>ssObj=s)}
        height={560} allowNumberFormatting={true} created={onCreated} allowCellFormatting={true}
        allowConditionalFormat={true}
        openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
        allowSave={true}
        saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
        // beforeCellRender={beforeCellRender} 
        // sheets={sheets} 
        >
        <SheetsDirective>
          <SheetDirective name="Tình hình học tập"
           frozenColumns={5}
           >
           
            <ConditionalFormatsDirective>
              <ConditionalFormatDirective type='LessThan' cFColor='RedFT' value='8/30/2019' range='G3:G18'></ConditionalFormatDirective>
              <ConditionalFormatDirective type='GYRColorScale' range='C3:C18'></ConditionalFormatDirective>
            </ConditionalFormatsDirective>
            <RangesDirective>
              <RangeDirective dataSource={FormattingData} startCell="A2" ></RangeDirective>
            </RangesDirective>
            
            <ColumnsDirective>
              <ColumnDirective width={100}></ColumnDirective>
              <ColumnDirective width={158}></ColumnDirective>
              <ColumnDirective width={72}></ColumnDirective>
              <ColumnDirective width={113}></ColumnDirective>
              <ColumnDirective width={113}></ColumnDirective>
              <ColumnDirective width={77}></ColumnDirective>
              <ColumnDirective width={97}></ColumnDirective>
              <ColumnDirective width={90}></ColumnDirective>
              <ColumnDirective width={73}></ColumnDirective>
            </ColumnsDirective>
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
      {/* <SpreadsheetComponent 
       ref={((s:SpreadsheetComponent)=>ssObj=s)}
       >
        <SheetsDirective>
          <SheetDirective>
            <ColumnsDirective>
              <ColumnDirective width={100}></ColumnDirective>
              <ColumnDirective width={100}></ColumnDirective>
              <ColumnDirective width={100}></ColumnDirective>
              <ColumnDirective width={100}></ColumnDirective>
              <ColumnDirective width={100}></ColumnDirective>
            </ColumnsDirective>
            <RowsDirective>
              <RowDirective>
                <CellsDirective>
                  <CellDirective index={1} value="ID"></CellDirective>
                  <CellDirective index={2} value="Name"></CellDirective>
                  <CellDirective index={3} value="SDT"></CellDirective>
                  <CellDirective index={4} value="Status"></CellDirective>
                </CellsDirective>
              </RowDirective>
              {jsonData.map((item) => (
                <RowDirective key={item.id}>
                  <CellsDirective>
                    <CellDirective index={1} value={item.id}></CellDirective>
                    <CellDirective index={2} value={item.name}></CellDirective>
                    <CellDirective index={3} value={item.sdt}></CellDirective>
                    <CellDirective index={4} value={item.status}></CellDirective>
                  </CellsDirective>
                </RowDirective>
              ))}
            </RowsDirective>
            <RowDirective>
              <CellsDirective>
                <CellDirective index={1} value="P_GV"></CellDirective>
                <CellDirective index={2} value="Sum"></CellDirective>
                <CellDirective index={3} value="Desc"></CellDirective>
                <CellDirective index={4} value="Week"></CellDirective>
              </CellsDirective>
            </RowDirective>
            {jsonData.map((item) =>
              item.data.map((dataItem, index) => (
                <RowDirective key={index}>
                  <CellsDirective>
                    <CellDirective index={1} value={dataItem.p_gv}></CellDirective>
                    <CellDirective index={2} value={dataItem.sum}></CellDirective>
                    <CellDirective index={3} value={dataItem.desc}></CellDirective>
                    <CellDirective index={4} value={dataItem.week}></CellDirective>
                  </CellsDirective>
                </RowDirective>
              ))
            )}
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent> */}
    </div>
  );
}

export default StudentClassInformation;
