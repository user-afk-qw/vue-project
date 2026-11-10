export async function fetchArticlesFromApi(signal) {
  const response = await fetch('http://localhost:10000/articles', { signal })
  if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`)
  return await response.json()
}

export async function createArticleOnApi(article) {
  const { id, ...articleData } = article 
  
  const response = await fetch('http://localhost:10000/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData)
  })
  if (!response.ok) throw new Error('Ошибка при добавлении')
  return await response.json()
}

// НОВЫЙ МЕТОД ДЛЯ УДАЛЕНИЯ
export async function deleteArticleFromApi(id) {
  const response = await fetch(`http://localhost:10000/articles/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Ошибка при удалении')
  return true
}