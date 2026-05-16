# File Manager

Command-line file manager application built with Node.js.

The project provides basic filesystem operations through a terminal interface and demonstrates working with the Node.js File System API, streams, hashing, compression, and operating system utilities.

## Features

- Navigate between directories
- Read files
- Create files
- Rename files
- Copy files
- Move files
- Delete files
- Calculate file hash
- Compress and decompress files
- Display OS information

## Tech Stack

- Node.js
- JavaScript
- File System API
- Streams
- Zlib
- Crypto

## Installation

```bash
npm install
```

## Run Project

```bash
npm start -- --username=your_username
```

Example:

```bash
npm start -- --username=Andrey
```

## Available Commands

```bash
up
cd path_to_directory
ls
cat path_to_file
add new_file_name
rn path_to_file new_filename
cp path_to_file path_to_new_directory
mv path_to_file path_to_new_directory
rm path_to_file
os --EOL
os --cpus
os --homedir
os --username
os --architecture
hash path_to_file
compress path_to_file path_to_destination
decompress path_to_file path_to_destination
```
