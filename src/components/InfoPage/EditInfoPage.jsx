import React, { Component } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createUndoPlugin from 'draft-js-undo-plugin'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'
import createToolbarLinkPlugin from 'draft-js-toolbar-link-plugin'
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
} from 'draft-js-buttons'
import { Flex, Box } from 'rebass'
import { Container, ToolbarNav, EditorStyle, EditPanel, StaticToolbar } from 'styles'

const undoPlugin = createUndoPlugin()
const toolbarLinkPlugin = createToolbarLinkPlugin({
    inputPlaceholder: 'Insert URL here...'
})
const { LinkButton } = toolbarLinkPlugin
const { UndoButton, RedoButton } = undoPlugin
const toolbarPlugin = createToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
        Separator,
        HeadlineOneButton,
        HeadlineTwoButton,
        HeadlineThreeButton,
        Separator,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
        CodeBlockButton,
        LinkButton,
        Separator,
        UndoButton,
        RedoButton
    ]
})
const { Toolbar } = toolbarPlugin
const plugins = [toolbarPlugin, toolbarLinkPlugin, undoPlugin]

export default class EditInfoPage extends Component {
    displayName = 'information page editor'
    constructor(props) {
        super(props)

        if (props.page.content) {
            this.state = {
                editorState: EditorState.createWithContent(
                    convertFromRaw(props.page.content)
                )
            }
        }
    }

    onChange = editorState => this.setState({ editorState })
    focus = () => this.refs.editor.focus()
    onSave = () => {
        const { editorState } = this.state
        const { match, pageActions } = this.props
        const rawData = convertToRaw(editorState.getCurrentContent())
        pageActions.saveEditing(match.params.name, rawData)
    }
    onCancel = () => {
        const { pageActions, match } = this.props
        pageActions.cancelEditing(match.params.name)
    }
    render() {
        const { editorState } = this.state
        return (
            <Container>
                <EditPanel>
                    <ToolbarNav>
                        <StaticToolbar>
                            <Toolbar />
                        </StaticToolbar>
                    </ToolbarNav>
                    <EditorStyle>
                        <Editor
                            editorState={ editorState }
                            onChange={ this.onChange }
                            plugins={ plugins }
                            ref="{(element) => { this.editor = element }}"
                        />
                    </EditorStyle>
                    <Flex justify="space-between">
                        <Box width="25%" />
                        <Box width="25%" />
                        <Box width="25%" mr={ 1 }>
                            <button
                                style={ { margin: '5px auto' } }
                                type="button"
                                className="btn btn-block btn-default"
                                onClick={ this.onCancel }>
                                Cancel
                            </button>
                        </Box>
                        <Box width="25%">
                            <button
                                style={ { margin: '5px auto' } }
                                type="button"
                                className="btn btn-block btn-success"
                                onClick={ this.onSave }>
                                Save
                            </button>
                        </Box>
                    </Flex>
                </EditPanel>
            </Container>
        )
    }
}
