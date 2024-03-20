import { execSync, fork } from 'child_process';
import path from 'path';

const distPath = path.join(__dirname, '..', 'dist');
const serverPath = path.join(distPath, 'server', 'main.js');

// lunch server
// todo: get arguments and pass them to server
fork(serverPath);
