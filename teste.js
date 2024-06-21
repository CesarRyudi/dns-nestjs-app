async function downloadFile(url, filename) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentDisposition = response.headers.get('Content-Disposition');
  const contentLength = response.headers.get('X-Total-Count');

  let total = 0;

  if (contentLength) {
    total = parseInt(contentLength, 10);
  }

  let loaded = 0;

  const reader = response.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      function push() {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          loaded += value.byteLength;

          updateProgress(loaded, total);

          controller.enqueue(value);
          push();
        });
      }
      push();
    },
  });

  const newResponse = new Response(stream);
  const blob = await newResponse.blob();
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename || 'data.csv';
  document.body.appendChild(link);
  link.click();

  link.remove();
}

function updateProgress(loaded, total) {
  if (total > 0) {
    const peso = total * 366.5;
    let percentage = Math.round((loaded / peso) * 100);
    if (percentage > 99) percentage = 99;
    updateVariable(percentage);
  }
}

function updateVariable(value) {
  wwLib.executeWorkflow('8b1cff4b-1d57-44c6-ab45-d1ddf9cd0b8a', {
    value: value,
  });
}

const search = variables['14bb7e2f-7123-4569-bb50-85ef50c4d71e'];

await downloadFile(
  `https://dns.harutech.com.br/quotes/exportTest/${search}`,
  'dataNew.csv',
);

updateVariable(100);
