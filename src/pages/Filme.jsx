import React, { Component } from 'react';
import EstruturaDaPagina from '../components/EstruturaDaPagina';
import Section from '../components/Section';
import Cadastro from '../filme/Cadastro';
import Listagem from '../filme/Listagem';
import FilmeAPI from '../services/filme';

class Filme extends Component {
    constructor(props) {
        super(props);

        this.state = {filmes: []};
        //this.editarFilme = this.editarFilme.bind(this);
        this.excluirFilme = this.excluirFilme.bind(this);
    }

    componentDidMount() {
        this.carregarFilmes();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.filmeEmEdicao === prevState.filmeEmEdicao) {
            return;
        }

        console.log("this.state.filmeEmEdicao no Update", this.state.filmeEmEdicao);
    }

    async carregarFilmes() {
        const filmes = await FilmeAPI.buscarFilmes();
        this.setState({filmes: filmes});
    }

    editarFilme = (filme) => {
        this.setState({filmeEmEdicao: filme});
    }

    excluirFilme(filme)  {
        FilmeAPI.excluirFilme(filme.id).then(() => this.carregarFilmes());
    }

    salvarFilme = filme => {
        if (filme.id) {
            FilmeAPI.atualizarFilme(filme).then(() => {
                this.carregarFilmes();
                this.setState({filmeEmEdicao: null});
            });
            return;
        }

        FilmeAPI.inserirFilme(filme).then(() => {
            this.carregarFilmes();
            this.setState({filmeEmEdicao: null})
        });
    }

    render() {
        return (
            <React.Fragment>
                <EstruturaDaPagina title="Filmes">
                    <Section titulo="Cadastro de Filmes">
                        <Cadastro filme={this.state.filmeEmEdicao} salvar={this.salvarFilme}/>
                    </Section>
                    <Section titulo="Listagem de Filmes">
                        <Listagem filmes={this.state.filmes} editar={this.editarFilme} excluir={this.excluirFilme} />
                    </Section>
                </EstruturaDaPagina>
                {/* <EstruturaDaPagina title="Filmes" 
                    children={[
                        <Section titulo="Cadastro de Filmes" />,
                        <Section titulo="Listagem de Filmes">]}
                /> */}
            </React.Fragment>
        )
    }
}

export default Filme;