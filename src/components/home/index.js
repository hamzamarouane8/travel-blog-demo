import React from "react"
import { graphql, navigate, StaticQuery } from "gatsby"
import styled from "styled-components"

//--------------------------------------------------

export default ({}) => (
  <StaticQuery query={graphql`query HomeQuery {
  allContentfulBlog(limit: 9, sort: {fields: [createdAt], order: DESC},
  filter: {node_locale: {eq: "en-US"}, home: {eq: true}}) {
    edges {
      node {
        id
        slug
        title
        category{
          title
          id
        }
        featuredImage {
          fluid(maxWidth: 1200, quality: 85) {
            src
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
}
`}

               render={data => (
                 <Feed>
                   {data.allContentfulBlog.edges.map(edge => (
                       <div key={edge.node.id}
                            className='card'
                            style={{
                              backgroundImage: `linear-gradient(
                             to bottom,
                             rgba(10,10,10,0) 0%,
                            rgba(10,10,10,0) 50%,
                            rgba(10,10,10,0.7) 100%
                             ),url(${edge.node.featuredImage.fluid.src}`
                            }}
                            onClick={() => navigate(`/blog/${edge.node.slug}`)}>
                         {edge.node.category.map(category=>(
                           <p className='card__category'>{category.title}</p>
                         ))

                         }
                         <p className='card__title'>{edge.node.title}</p>
                       </div>
                     ))
                   }
                 </Feed>
               )}
  />
)

const Feed = styled.div`
    display: grid;
    grid-template-columns: repeat(12,1fr);
    grid-auto-rows: 300px;
    grid-gap: 16px;
    margin: 40px 0;

.card__category {
  font-size:14px;
  line-height:18px;
  font-weight:700;
  color:#fff;
  margin:0;
}

.card__title {
  font-size:24px;
  line-height:28px;
  color:#fff;
  margin:10px 0 0 0;
}

.card {
  background-size:cover;
  background-repeat:no-repeat;
  background-position: center;
  border-radius:5px;
  border:none;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  padding:20px;
  transition: all .3s ease;
}
 
.card:hover {
  cursor:pointer;
  transform:scale(1.02);
}

.card:nth-child(1){
  grid-column-start: span 6;
}
.card:nth-child(6){
  grid-column-start: span 6;
}
.card:nth-child(7){
  grid-column-start: span 6;
}
.card:nth-child(2){
  grid-column-start: span 3;
}
.card:nth-child(3){
  grid-column-start: span 3;
}
.card:nth-child(4){
  grid-column-start: span 3;
}
.card:nth-child(5){
  grid-column-start: span 3;
}
.card:nth-child(8){
  grid-column-start: span 3;
}
.card:nth-child(9){
  grid-column-start: span 3;
}

@media screen and (max-width:1200px) {
  .card:nth-child(n) {
    grid-column-start : span 6;
  }
}

@media screen and (max-width:800px) {
  .card:nth-child(n) {
    grid-column-start : span 12;
  }
}

`
