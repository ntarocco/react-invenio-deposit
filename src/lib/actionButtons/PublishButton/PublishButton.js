// This file is part of React-Invenio-Deposit
// Copyright (C) 2020 CERN.
// Copyright (C) 2020 Northwestern University.
//
// React-Invenio-Deposit is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Modal } from 'semantic-ui-react';
import { ActionButton } from 'react-invenio-forms';

export default class PublishButton extends Component {
  state = { confirmOpen: false };

  onPublishClick = (event, formik) => {
    this.props.publishClick(event, formik);
    this.setState({ confirmOpen: false });
  };

  draftAlreadyCreated = (record) => (record.id || record.pid ? true : false);

  isDisabled = (formik) => {
    const record = formik.values;
    return (
      !this.draftAlreadyCreated(record) ||
      (this.props.filesEnabled && !this.props.nubmerOfFiles) ||
      this.props.fileUploadOngoing ||
      formik.isSubmitting
    );
  };

  confirmPublish = () => this.setState({ confirmOpen: true });

  handleClose = () => this.setState({ confirmOpen: false });

  render() {
    const {
      formAction,
      publishClick,
      fileUploadOngoing,
      filesEnabled,
      nubmerOfFiles,
      ...uiProps
    } = this.props;
    return (
      <>
        <ActionButton
          isDisabled={this.isDisabled}
          name="publish"
          onClick={this.confirmPublish}
          primary
          {...uiProps}
        >
          {(formik) =>
            formik.isSubmitting && formAction === 'publish' ? (
              <>
                <Icon size="large" loading name="spinner" />
                Publish
              </>
            ) : (
              'Publish'
            )
          }
        </ActionButton>
        {this.state.confirmOpen && (
          <Modal
            open={this.state.confirmOpen}
            onClose={this.handleClose}
            size="small"
          >
            <Modal.Content>
              <h3>Are you sure you want to publish this record?</h3>
            </Modal.Content>
            <Modal.Actions>
              <Button secondary onClick={this.handleClose}>
                Cancel
              </Button>
              <ActionButton
                name="publish"
                onClick={this.onPublishClick}
                primary
                content="Publish"
              />
            </Modal.Actions>
          </Modal>
        )}
      </>
    );
  }
}

PublishButton.propTypes = {};
