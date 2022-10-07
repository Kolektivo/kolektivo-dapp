const params = new URLSearchParams(location.search);
const stamp = params.get('seed-data');
if (stamp) {
  void import('./firebase').then(async (x) => await x.seed(new Date(stamp)));
} else {
  import('./app-root');
}
