import styled from "@emotion/styled";

//리스트 스타일
export const PackerListModal = styled.div`
    width: 30%;
    height: 90%;
    position: absolute;
    top: 20%;
    left: 10%;
    padding: 0.5%;
    background: url("/images/log/log_back_2.webp") 50% 50% no-repeat;
    background-size: cover;
    z-index: 20;
    color: black;
    font-family: nexonGothic;
    border-radius: 1%;
`;

export const NameBox = styled.div`
    width: 100%;
    height: 15%;
    padding: 3%;
    .mainTitle {
        width: 100%;
        height: 60%;
        display: flex;
        align-items: flex-end;
        font-size: 1.8vw;
        font-family: neurimboGothic;
    }
    .subTitle {
        width: 100%;
        height: 40%;
        display: flex;
        align-items: flex-start;
        font-size: 0.7vw;
        font-family: neurimboGothic;
    }
`;

export const ListBox = styled.div`
    width: 100%;
    height: 75%;
    padding: 0 3%;
    overflow-y: auto;
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #eaeaea;
    }
    .oneBox {
        width: 100%;
        height: 16%;
        border: 3px solid #eaeaea;
        border-radius: 5px;
        padding: 3%;
        margin-bottom: 2%;
        .listTitle {
            width: 100%;
            height: 65%;
            font-size: 1.1vw;
            font-weight: 600;
            color: #555;
            display: flex;
            align-items: center;
        }
        .listPreview {
            width: 100%;
            height: 35%;
            font-size: 0.6vw;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            // white-space: pre-wrap;
        }
    }
`;

export const ExtractBox = styled.div`
    width: 100%;
    height: 10%;
    padding: 3%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .buttonWrap {
        width: 30%;
        height: 100%;
        button {
            background: url("/images/log/extract.webp") 50% 50% no-repeat;
            background-size: cover;
            padding-bottom: 3%;
            border-radius: 30px;
        }
    }
`;

//작성 스타일
export const PackerWriteModal = styled.div`
    width: 120%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 102%;
    padding: 5%;
    background: url("/images/log/log_back.webp") 50% 50% no-repeat;
    background-size: cover;
    z-index: 25;
    color: black;
    font-family: nexonGothic;
    border-radius: 1%;
    form {
        width: 100%;
        height: 100%;
    }
`;

export const WriteTitleBox = styled.div`
    width: 100%;
    height: 10%;
    color: black;
    input {
        caret-color: black;
        color: black;
        &::placeholder {
            color: #eaeaea;
        }
    }
`;

export const WriteBodyBox = styled.div`
    width: 100%;
    height: 80%;
    color: black;
    border-top: 2px solid #eaeaea;
    border-bottom: 2px solid #eaeaea;
    input {
        caret-color: black;
        color: black;
        &::placeholder {
            color: #eaeaea;
        }
    }
    textarea {
        height: 94%;
        caret-color: black;
        color: black;
        font-size: 0.8vw;
        padding: 1.5%;
        &::-webkit-scrollbar-thumb {
            border-radius: 2px;
            background: #eaeaea;
        }
        &::placeholder {
            color: #eaeaea;
        }
    }
`;

export const RepackBox = styled.div`
    width: 100%;
    height: 10%;
    padding: 2%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .buttonWrap {
        width: 27%;
        height: 95%;
        button {
            background: url("/images/log/repack.webp") 50% 50% no-repeat;
            background-size: cover;
            padding-bottom: 3%;
            border-radius: 30px;
        }
    }
`;

export const SubmitBox = styled.div`
    width: 100%;
    height: 10%;
    padding: 2%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .buttonWrap {
        width: 27%;
        height: 95%;
        button {
            background: url("/images/log/packing.webp") 50% 50% no-repeat;
            background-size: cover;
            padding-bottom: 3%;
            border-radius: 30px;
        }
    }
`;

//내용 조회 디테일
export const PackerDetailModal = styled.div`
    width: 120%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 102%;
    padding: 5%;
    background: url("/images/log/log_back.webp") 50% 50% no-repeat;
    background-size: cover;
    z-index: 25;
    color: black;
    font-family: nexonGothic;
    border-radius: 1%;
    form {
        width: 100%;
        height: 100%;
    }
`;

export const DetailTitleBox = styled.div`
    width: 100%;
    height: 10%;
    color: black;
    font-size: 1.6vw;
    font-weight: 600;
    display: flex;
    align-items: center;
    border-bottom: 3px solid #555;
`;

export const DetailBodyBox = styled.div`
    width: 100%;
    height: 80%;
    color: black;
    border-top: 2px solid #eaeaea;
    border-bottom: 2px solid #eaeaea;
    padding: 3% 1% 3% 0;
    overflow-y: scroll;
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #eaeaea;
    }
    img {
        width: 100%;
        margin-bottom: 2%;
    }
    p {
        white-space: pre-wrap;
        text-align: justify;
        line-height: 1.5;
    }
`;
