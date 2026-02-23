import app from './app';
import config from './config';

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Example app listening on port on ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
