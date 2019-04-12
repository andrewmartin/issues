import React, { Component } from 'react';
import cx from 'classnames';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import IssueItem from '../IssueItem';

import styles from './DraggableIssues.module.scss';

// create a new array of sorted items on the drag end
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class DraggableIssues extends Component {
  onDragEnd = result => {
    // item is outside the droppable area
    if (!result.destination) {
      return;
    }

    const { onSetOrder, items } = this.props;

    const orderedItems = reorder(items, result.source.index, result.destination.index);

    onSetOrder(orderedItems);
  };

  render() {
    const { items, onReset } = this.props;

    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {droppableProvided => (
              <div ref={droppableProvided.innerRef}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        className={cx({
                          [styles.isDragging]: draggableSnapshot.isDragging,
                        })}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}>
                        <IssueItem {...item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {onReset && (
          <button className={styles.button} onClick={onReset} type="button">
            Reset Order
          </button>
        )}
      </>
    );
  }
}
