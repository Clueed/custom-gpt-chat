import { useState } from 'react'
import { useSelector } from 'react-redux'
import { encode } from './gpt-3-encoder-react/Encoder'

/**
 * A custom React hook that returns a boolean state variable indicating whether an element is being hovered over, as well as a set of event props for handling hover behavior.
 *
 * @returns {[boolean, object]} An array containing a boolean state variable and a set of event props for handling hover behavior.
 */
function useHover () {
  // Initialize a boolean state variable to indicate whether an element is being hovered over
  const [hovering, setHovering] = useState(false)

  // Create an object containing event props for handling hover behavior
  const onHoverProps = {
    onMouseEnter: () => setHovering(true), // Set the "hovering" state variable to true when the element is hovered over
    onMouseLeave: () => setHovering(false) // Set the "hovering" state variable to false when the element is no longer being hovered over
  }

  // Return an array containing the "hovering" state variable and the event props for handling hover behavior
  return [hovering, onHoverProps]
}

// Define an object that stores the prices of different OpenAI models in centicents (1/100 of a cent)
const pricing = {
  'gpt-3.5-turbo': 20,
  'gpt-3.5-turbo-0301': 20,
  'text-davinci-003': 200,
  'text-curie': 20,
  'text-babbage': 5,
  'text-ada': 4
}

// Define a React functional component that takes in a "newPrompt" prop and calculates the cost of the prompt
export default function CostAndToken ({ newPrompt }) {
  // Use the useSelector hook from Redux to get the conversation state
  const messages = useSelector(state => state.conversation.messages)

  // Get an array of UUIDs for all messages in the conversation
  const messagesUUIDs = Object.keys(messages)

  // Map over the array of UUIDs to get an array of message content strings
  const previousMessagesContent = messagesUUIDs.map(
    uuid => messages[uuid].content
  )

  // Join the array of message content strings into a single string
  const previousMessagesString = previousMessagesContent.join(' /n ')

  // Tokenize the previous messages string and the new prompt using the encode function
  const tokenizedString = encode(previousMessagesString + newPrompt)

  // Get the OpenAI model currently selected in the Redux store
  const model = useSelector(state => state.openAIConfig.model)

  // Get the cost per thousand tokens for the selected model from the pricing object
  const deciCentsPerThousendToken = pricing[model]

  // Calculate the cost of the prompt based on the length of the tokenized string and the cost per thousand tokens
  const centString =
    '¢' +
    Math.round(
      (((tokenizedString.length / 1000) * deciCentsPerThousendToken) / 100) *
        10000
    ) /
      10000

  // Get the length of the tokenized string
  const tokenCount = tokenizedString.length

  // Use the useHover hook to create a boolean state variable and a set of event props for hovering behavior
  const [IsHovering, HoverProps] = useHover()

  return (
    <>
      <div
        {...HoverProps}
        className='bg-gray-50 text-xs py-2 w-auto text-gray-600 rounded-lg  block p-2.5 dark:bg-gray-700 dark:text-white text-right opacity-75'
      >
        {IsHovering
          ? `Estimated API cost: ${centString} for ${tokenCount} tokens`
          : `${centString} (${tokenCount})`}
      </div>
    </>
  )
}
