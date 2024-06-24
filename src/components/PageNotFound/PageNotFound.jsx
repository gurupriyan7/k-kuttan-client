import './PageNotFound.css'
import back from '../../img/wp4082523.webp'
import { useNavigate } from 'react-router-dom'
import { path } from '../../paths/paths'
import notFound from '../../img/notFound.gif'

const PageNotFound = () => {
  return (
    <div className="Home-pageNotFound" style={{ backgroundImage: `URL(${back})` }}>
      <section class="page_404">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
                <div
                  class="four_zero_four_bg"
                  style={{ backgroundImage: `URL(${notFound})` }}
                >
                  <h1 class="text-center ">404</h1>
                </div>

                <div class="contant_box_404">
                  <h3 class="h2">Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>

                  <a href="/" class="link_404">
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PageNotFound
