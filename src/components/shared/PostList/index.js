import React, { Component } from 'react';
import {withServer} from "../../../Server";
import {Typography} from "@material-ui/core";
import {timeConverter} from "../../../utils/HelperFunctions";
import * as ROUTERS from '../../../constants/routes'
import {Link} from 'react-router-dom'
import {withStyles} from "@material-ui/styles";

const styles = {
  topCategories: {
    marginTop: '20px',
  },
  topCatHeader: {
    marginTop: '20px',
  },
  topCatTitle: {
    color: '#212121',
    textDecoration: 'none',
    marginBottom: '10px'
  },
  topCatDate: {
    color: '#9e9e9e',
  },
  topCatCategory: {
    marginTop: '10px',
  },
  topCatImage: {
    width: '100%',
    marginBottom: '5px'
  },
  topCatEmbed: {
    width: '100%',
  },
};

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {}
    }
  }

  componentDidMount() {
    this.props.server.getPosts(0,3).then(res => this.setState({posts: res.data}))
  }

  render() {
    const classes = this.props.classes;
    const posts = this.state.posts;
    return (
      <div className='container py-5'>
        <h1 className='text-center mb-5 text-uppercase'>
          <span className='highlighted-text grey-text'>House</span> Нийтлэлүүд
        </h1>
        <div className='row'>
          {
            Object.keys(posts).map(key =>
                <div className='col-md-4'>

                  <Typography variant='body2' className={classes.topCatDate}>{timeConverter(posts[key].dateCreated*1000)}</Typography>
                  <Link to={ROUTERS.POST+key} className={classes.topCatTitle}>
                    <Typography variant='h6'>
                      <b>{posts[key].blocks.map(block => {
                        if(block.type === 'header') return block.data.text
                      })}</b>
                    </Typography>
                  </Link>
                  {posts[key].blocks.map(block => {
                    if(block.type === 'image')
                      return <img className={classes.topCatImage} src={block.data.file.url}/>
                    else if (block.type == 'embed')
                      return <iframe className={classes.topCatEmbed} src={block.data.embed}
                                     frameBorder="0"
                                     allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                     allowFullScreen></iframe>
                  })}
                  <Typography variant='body1'>
                    {posts[key].blocks.map(block => {
                      if(block.type === 'paragraph') return block.data.text.replace(/(<([^>]+)>)/ig,"").replace("&nbsp;", " ").slice(0,100)+'...'
                    })}
                  </Typography>

                </div>
            )
          }



        </div>
      </div>
    )
  }
}

export default withStyles(styles)(withServer(PostList));
