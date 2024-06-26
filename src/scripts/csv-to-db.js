const { PrismaClient } = require('@prisma/client');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

function extrairNumeros(str) {
  return str.replace(/[^\d.-]/g, ''); // Remove todos os caracteres exceto dígitos, ponto e traço
}

function extrairData(str) {
  if(str){
    const partes = str.split('/');
    console.log(partes);
    const ano = partes[2];
    const mes = partes[1].padStart(2, '0');
    const dia = partes[0].padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
  else return 0;

}

async function main() {
  console.log(new Date('Invalid Date'));

  const prisma = new PrismaClient();
  let i = 0;

  fs.createReadStream('csv.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const record of results) {
        let date = new Date(extrairData(record['Date_RFQ']) ?? 0);
        if(date == 'Invalid Date') date = new Date(0); 

        const mappedData = {
          Log_Company: record.Log_Company,
          Table: record['Table'],
          NOME: record['NOME'],
          PN: record.PN,
          Date_RFQ: date,
          UNIT_money:
            Number(extrairNumeros(record['UNIT_money'].replace(',', '.'))) || 0,
          UOM: record.UOM,
          Customer: record.Customer,
          BUYER: record.BUYER,
          DESC: record.DESC,
          QTY: record['QTY'],
          PN_ALT: record['PN_ALT'],
          DESC_PN_ALT: record['DESC_PN_ALT'],
          OEM: record.OEM,
          SOURCE_1: record['SOURCE_1'],
          SOURCE_2: record['SOURCE_2'],
          SOURCE_3: record['SOURCE_3'],
          DATE: record.DATE,
          LT: record.LT,
          REMARKS: record.REMARKS,
          Concluido: record.Concluido,
          Customer_PO: record['Customer_PO'],
          TERMS: record.TERMS,
          CURRENCY: record.CURRENCY,
          PRECO_COMPRA: record['PRECO_COMPRA'],
          Vendor: record.Vendor,
          AVAILABLE: record.AVAILABLE,
          CONDITION: record.CONDITION,
          VEND_DELIVERY: record['VEND_DELIVERY'],
          FINAL_DESTINATION: record['FINAL_DESTINATION'],
          OBS: record.OBS,
          PN_Manufacturer: record['PN_Manufacturer'],
          Status_Quantum: record['Status_Quantum'],
          vendor_PO: record['vendor_PO '],
          SO: record.SO,
          money_LUCRO: Number(
            extrairNumeros(record['money_LUCRO'].replace(',', '.')),
          ),
          Total_LUCRO: Number(
            extrairNumeros(record['Total_LUCRO'].replace(',', '.')),
          ),
          Sales_Code: record['Sales_Code'],
          ABBREV: record.ABBREV,
          EMAIL: record.EMAIL,
          Cotacao_Quantum: record['Cotacao_Quantum'],
          Customer_PO_Receipt: record['Customer_PO_Receipt'],
          Location: record['Location'],
        };
        const response = await prisma.quotesCSV.create({ data: mappedData });
        console.log(i++);
      }
    });

  await prisma.$disconnect();
}

main();
// console.log(Number(extrairNumeros('6,5528430034asd1297'.replace(',', '.'))));
