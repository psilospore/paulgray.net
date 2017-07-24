import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

const dot = entry => val => val[entry];

import '../css/typography.css';
import '../css/custom.scss';
import 'prismjs/themes/prism-solarizedlight.css';

export default class Index extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges.map(dot('node'));

    return (
      <div className="index">
        <Helmet>
          <title>The Gray Side of Software</title>
          {/* Facebook Open Graph */}
          <meta property="og:url" content="https://paulgray.net" />
          <meta property="og:title" content="The Gray Side of Software" />
          <meta name="description" property="og:description" content="Paul Gray is a software engineer, and sometimes he writes some stuff." />
        </Helmet>
        <h1>The Gray Side of Software</h1>
        <p>I'm a software engineer, and sometimes I write some stuff.</p>
        {posts.map(post => {
          const desc = post.html.replace(/<(?:.|\n)*?>/gm, '').split(" ").slice(0, 60).join(" ");
          return (
            <div className="small-blog-post" key={post.frontmatter.title}>
              <a className="title-container" href={post.fields.slug}>
                <img src="https://lh3.googleusercontent.com/-m_rIBQhJziQ/AAAAAAAAAAI/AAAAAAAAAAA/AI6yGXydZXawbSEwT-6SRQyYGwENOQA6HQ/s64-c-mo-md/photo.jpg"/>
                <div>
                  <div className="title">{post.frontmatter.title}</div>
                  <div className="date">{post.frontmatter.date}</div>
                </div>
              </a>
              <div className="description" >{desc}...</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export const pageQuery = graphql`
  query AllMarkdown {
    allMarkdownRemark(sort: {order:DESC,fields:[frontmatter___date]}) {
      edges {
        node {
          fields {slug}
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
