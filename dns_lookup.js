import dns from 'dns';

const domains = [
  'db.numzdnwdlysgodumavjg.supabase.co',
  'numzdnwdlysgodumavjg.supabase.co'
];

function lookup(domain) {
  dns.resolveAny(domain, (err, addresses) => {
    if (err) {
      console.error(`Error resolving ${domain}:`, err);
    } else {
      console.log(`\nResults for ${domain}:`);
      console.log(JSON.stringify(addresses, null, 2));
    }
  });
}

domains.forEach(lookup);
