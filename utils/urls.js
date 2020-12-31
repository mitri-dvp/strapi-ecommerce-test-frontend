export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'
// export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:1337'

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK || 'pk_test_d3oAiUF60EUPKG4NRvriNmGw00yhvTmZeh'

export const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT || 'AWETv4d6VsZPyIwzUER8gKkcqFMcnd_mV9aSYcgzOR25NO78wGV8veG0fti1uDsBrGyihVsnzazqyR6Q'

export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || 'Online Shop'

/**
 * Given an img retuns the Url
 * Works for local and deployed strapis
 * @param {any} img 
 */
export const fromImgToUrl = (img) => {
  // No img default
  if(!img) {
    return '/mitri.svg'
  }

  // If img has a relative path
  if(img.url.indexOf('/') === 0) {
    // let array = img.url.split('/')
    // array[2] = 'thumbnail_'+img.url.split('/')[2]
    // let result = array.join('/')
    return `${API_URL}${img.url}`
  }

  return img.url
}