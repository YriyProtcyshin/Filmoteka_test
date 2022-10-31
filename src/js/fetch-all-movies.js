export async function fetchAllMovies() {
  const api = 'd0441be4fdc25d632a912102339ee4f4';
  const url = 'https://api.themoviedb.org/3/trending/all/week';

  const param = new URLSearchParams({
    api_key: 'd0441be4fdc25d632a912102339ee4f4',
    total_results: 21,
  });

  const rest = await fetch(`${url}?${param}`);
  const response = await rest.json();
  return response;
}
