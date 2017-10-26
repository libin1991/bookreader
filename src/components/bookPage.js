/**
 * Created by admin on 2017/10/24.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bookDetail, bookHotReview, recommondBookList} from '../actions/bookAction'
import BDContent from './common/component-module/BDContent'
import './common/style/bookpage.scss'

class Book extends Component {
    constructor(props) {
        super(props);
        this.bookId = this.props.location.query.bookId;
        this.state = {
            bookId: this.bookId
        };
    }

    componentDidMount() {
        //get书籍详情
        this.props.getBookDetail(this.state.bookId);
        //get热门评论
        //this.props.getBookHotReview(this.state.bookId);
        //get推荐书单
        //this.props.getRecommondBookList(this.state.bookId);
    }

    renderContent(type) {
        let content = <div/>;
        if (!type) {
            content = <BDContent bookInfo={this.props.book.bookDetail}/>;
        } else {
            content = <div className="loading">加载中</div>;
        }
        return content;
    }

    render() {
        return <div className="page-detail-container">
            {this.renderContent(this.props.book.isLoadingDetail)}
        </div>;
    }
}


const mapStateToProps = (store) => {
    const {book} = store;
    return {
        book
    }
};

const mapDispatchToProps = (dispatch) => ({
    getBookDetail: (id) => {
        dispatch(bookDetail(id))
    }, getBookHotReview: (id) => {
        dispatch(bookHotReview(id))
    }, getRecommondBookList: (id) => {
        dispatch(recommondBookList(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);