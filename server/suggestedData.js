import sql from "./db.js";

const getParts = async (parts) => {
    const { cpu, gpu, ram, storage, motherboard, powerSupply, pcCase } = parts;
    const cpuPart = await sql`select name, price, url from parts where price <= ${cpu} and category = 'cpu' order by price desc limit 1`;
    const gpuPart = await sql`select name, price, url from parts where price <= ${gpu} and category = 'video-card' order by price desc limit 1`;
    const ramPart = await sql`select name, price, url from parts where price <= ${ram} and category = 'memory' order by price desc limit 1`;
    const storagePart = await sql`select name, price, url from parts where price <= ${storage} and category = 'internal-hard-drive' order by price desc limit 1`;
    const motherboardPart = await sql`select name, price, url from parts where price <= ${motherboard} and category = 'motherboard' order by price desc limit 1`;
    const powerSupplyPart = await sql`select name, price, url from parts where price <= ${powerSupply} and category = 'power-supply' order by price desc limit 1`;
    const casePart = await sql`select name, price, url from parts where price <= ${pcCase} and category = 'case' order by price desc limit 1`;
    return { cpuPart, gpuPart, ramPart, storagePart, motherboardPart, powerSupplyPart, casePart };
  }

  export default getParts;  