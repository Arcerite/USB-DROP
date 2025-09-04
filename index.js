const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 10000;

app.get('/:iconName', (req, res) => {
  const iconName = req.params.iconName;
  const filePath = path.join(__dirname, 'icon_storage', iconName);

  if (fs.existsSync(filePath)) {
    const match = iconName.match(/brick(\d+)\.ico/i);
    const usbNumber = match ? match[1] : "?";

    const timestamp = new Date().toISOString();
    console.log(`[PHONE HOME] ${timestamp} - USB ${usbNumber} was plugged in`);

    res.setHeader('Content-Type', 'image/x-icon');
    res.sendFile(filePath);
  } else {
    res.status(404).send('Icon not found');
  }
});

// Optional landing page
app.get('/', (req, res) => {
  res.send('<h2>USB Drop Demo Server</h2><p>This is a safe educational demo.</p>');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
