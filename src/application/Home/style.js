import styled from 'styled-components';
import style from '../../assets/global-style';

export const Top = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 10px;
    background: ${style["theme-color"]};
    &>span {
        line-height: 40px;
        color: #f1f1f1;
        &.iconfont {
            font-size: 25px;
        }
    }
`;

export const Tab = styled.div`
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: ${style["theme-color"]};
    a {
        flex: 1;
        padding: 2px 0;
        font-size: 14px;
        color: #e4e4e4;
        span {
            padding-bottom: 2px;
            border-bottom: 2px solid transparent;
        }
        &.selected {
            color: #f1f1f1;
            span {
                font-weight: 700;
                padding-bottom: 2px;
                border-bottom: 2px solid #f1f1f1;
            }
        }
    }
`;

export const TabItem = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;