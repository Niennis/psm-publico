export const fetchBlogs = async () => {
  const BLOGS_API = 'https://showbloglist-a6dzcva7fcfmfgdu.eastus-01.azurewebsites.net/main'
  try {
    const data = await fetch(BLOGS_API, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        // 'ngrok-skip-browser-warning': 'any',
        'body': null,
      }
    })

    const blogs = await data.json()
    return blogs
  } catch (err) {
    console.log(err)
  }
}

export const fetchBlog = async (id) => {
  const BLOGS_API = 'https://showblogbyid-f4dxh4bvgydmdzh6.eastus-01.azurewebsites.net/main'

  const body = {
    id
  }
  try {
    const data = await fetch(BLOGS_API, {
      method: "POST",
      // cors: "no-cors",
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        // 'ngrok-skip-browser-warning': 'any'
      },
      body: JSON.stringify(body)
    })
    return data.json()
  } catch (err) {
    console.log(err)
  }
}

/*
export const addBlog = async (blog) => {
  const BLOGS_API = process.env.NEXT_PUBLIC_BLOG_API + `/api/blogs`
  const { title, author_name, category, subcategory, status_blog, content, image } = blog;

  const body = {
    title, author_name, category, subcategory, status_blog, content, image
  }
  console.log(body);

  try {
    const data = await fetch(BLOGS_API, {
      method: "POST",
      cors: "no-cors",
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        'ngrok-skip-browser-warning': 'any'
      },
      body: JSON.stringify(body)
    })

    console.log('STATUS', data.status, data.ok, data)
    const response = await data.json()
    console.log('response', response)
    if (!data.ok && response.message.includes('Duplicate entry')) return { err: 'Usuario duplicado' }

    return response
  } catch (err) {
    console.log('ERROR', err)
  }
}

export const updateBlog = async (blog, id) => {
  const BLOGS_API = process.env.NEXT_PUBLIC_BLOG_API + `/api/blogs/${id}`
  const { title, author_name, category, subcategory, status_blog, content, image } = blog;

  const body = {
    title, author_name, category, subcategory, status_blog, content, image
  }

  try {
    const data = await fetch(BLOGS_API, {
      method: "PUT",
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        'ngrok-skip-browser-warning': 'any'
      },
      body: JSON.stringify(body)
    })

    return data
  } catch (err) {
    console.log(err)
  }
}

export const changeStatus = async (id, status) => {
  const BLOGS_API = process.env.NEXT_PUBLIC_BLOG_API + `/api/blogs/${id}`
  try {
    const data = await fetch(BLOGS_API, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        'ngrok-skip-browser-warning': 'any'
      },
      body: JSON.stringify({ status })
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

 */