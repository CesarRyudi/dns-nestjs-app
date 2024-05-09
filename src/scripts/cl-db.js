const { PrismaClient } = require('@prisma/client');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

function extrairNumeros(str) {
  return str.replace(/[^\d.-]/g, ''); // Remove todos os caracteres exceto dígitos, ponto e traço
}

async function main() {
  const prisma = new PrismaClient();
  let i = 0;

  fs.createReadStream('csv.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const record of results) {
        // console.log("\n\nRecord: =====>>" + JSON.stringify(record) + "\n\n");
        const mappedData = {
          TABLE: 0,
          NOME: record['NOME'],
          Date_RFQ: record['Date RFQ'],
          Customer: record.Customer,
          BUYER: record.BUYER,
          PN: record.PN,
          DESC: record.DESC,
          QTY: record['QTY'],
          UOM: record.UOM,
          PN_ALT: record['PN ALT#'],
          DESC_PN_ALT: record['DESC PN ALT'],
          OEM: record.OEM,
          SOURCE_1: record['SOURCE 1'],
          SOURCE_2: record['SOURCE 2'],
          SOURCE_3: record['SOURCE 3'],
          DATE: record.DATE,
          UNIT_money: Number(extrairNumeros(record['UNIT $'].replace(',', '.'))) || 0,
          LT: record.LT,
          REMARKS: record.REMARKS,
          Concluido: record.Concluido,
          // ID: record.ID,
          // id_cotacao: record['id cotacao'],
          // Quote: record['Quote?'],
          Customer_PO: record['Customer PO'],
          TERMS: record.TERMS,
          CURRENCY: record.CURRENCY,
          PRECO_COMPRA: record['PRECO COMPRA'],
          Vendor: record.Vendor,
          AVAILABLE: record.AVAILABLE,
          CONDITION: record.CONDITION,
          VEND_DELIVERY: record['VEND/DELIVERY'],
          FINAL_DESTINATION: record['FINAL DESTINATION'],
          OBS: record.OBS,
          // EDD_vendor: record.EDD_vendor,
          // EDD_Customer: record.EDD_Customer,
          PN_Manufacturer: record['PN Manufacturer'],
          Status_Quantum: record['Status Quantum'],
          vendor_PO: record['vendor PO '],
          SO: record.SO,
          money_LUCRO: Number(extrairNumeros(record['$ LUCRO'].replace(',', '.'))),
          Total_LUCRO: Number(extrairNumeros(record['Total LUCRO'].replace(',', '.'))),
          Sales_Code: record['Sales Code'],
          ABBREV: record.ABBREV,
          EMAIL: record.EMAIL,
          Cotacao_Quantum: record['Cotação Quantum'],
        };
        const response = await prisma.data.create({ data: mappedData });
        console.log(i++);
      }
    });
    
    await prisma.$disconnect();
}




const prisma = new PrismaClient();

async function limparTabela() {
  try {
    await prisma.data.deleteMany({}); 

    await prisma.$executeRaw`ALTER SEQUENCE "Data_id_seq" RESTART WITH 1`;


    console.log('Tabela limpa com sucesso.');
  } catch (error) {
    console.error('Erro ao limpar a tabela:', error);
  } finally {
    await prisma.$disconnect();
  }
}


// 
// main();
limparTabela();
// console.log(Number(extrairNumeros('6,5528430034asd1297'.replace(',', '.'))));