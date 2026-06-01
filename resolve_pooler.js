import dns from 'dns';

const regions = [
  'ap-southeast-2', // Sydney
  'ap-southeast-1', // Singapore
  'us-east-1',      // N. Virginia
  'us-west-1',      // N. California
  'eu-central-1',   // Frankfurt
  'eu-west-1',      // Ireland
  'ap-northeast-1', // Tokyo
  'sa-east-1',      // Sao Paulo
  'us-east-2'       // Ohio
];

function checkRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  dns.resolve4(host, (err, addresses) => {
    if (err) {
      // Console.log(`Region ${region} failed: ${err.code}`);
    } else {
      console.log(`✅ FOUND ACTIVE POOLER: ${host}`);
      console.log(`Addresses: ${addresses.join(', ')}`);
    }
  });
}

console.log("Probing regional pooler hosts...");
regions.forEach(checkRegion);
